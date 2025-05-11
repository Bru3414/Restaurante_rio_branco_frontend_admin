import { useDispatch, useSelector } from 'react-redux'
import { RootReducer } from '../../../store'
import { useGetOrdersByFilterMutation } from '../../../services/api'
import { useEffect } from 'react'
import {
  atualizaCurrentPage,
  atualizaFilter,
  atualizaRecords
} from '../../../store/reducers/recordsPanel'

import * as S from './styles'
import { formatDateToBR, parseToBrl } from '../../../utils'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useState } from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'
import './datepicker.css'
import { ptBR } from 'date-fns/locale/pt-BR'
import { format } from 'date-fns'
import Navigation from '../../ReuseComponents/Navigation'
import Loader from '../../ReuseComponents/Loader'

registerLocale('pt-BR', ptBR)

const RecordsPanel = () => {
  const [pageAtual, setPageAtual] = useState<number>(1)
  const [startDate, setStartDate] = useState<Date | null>()
  const [finalDate, setFinalDate] = useState<Date | null>()
  const { items, filter } = useSelector(
    (state: RootReducer) => state.recordsPanel
  )
  const [getOrdersByFilterAPI, { data, isSuccess, isLoading }] =
    useGetOrdersByFilterMutation()
  const dispatch = useDispatch()

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(atualizaRecords(data))
      setPageAtual(data.currentPage)
    }
  }, [isSuccess])

  useEffect(() => {
    getOrdersByFilterAPI(filter)
  }, [filter])

  const form = useFormik({
    initialValues: {
      customerName: '',
      status: ''
    },
    validationSchema: Yup.object({}),
    onSubmit: (values) => {
      let status
      let initialDate
      let finalData
      if (values.status !== '') {
        status = values.status as
          | 'AGUARDANDO_APROVACAO'
          | 'PRODUCAO'
          | 'PRONTO'
          | 'FINALIZADO'
          | 'CANCELADO'
      }
      if (startDate != null) {
        initialDate = format(startDate, 'yyyy-MM-dd')
      }
      if (finalDate != null) {
        finalData = format(finalDate, 'yyyy-MM-dd')
      }
      dispatch(
        atualizaFilter({
          customerName: values.customerName,
          initialDate: initialDate,
          finalDate: finalData,
          status: status,
          nPage: 1
        })
      )
    }
  })

  const filtro = (): JSX.Element => {
    return (
      <S.IntupsContainer onSubmit={form.handleSubmit}>
        <input
          name="customerName"
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          value={form.values.customerName}
          type="text"
          placeholder="Nome do cliente"
        />
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          maxDate={new Date()}
          dateFormat="dd/MM/yyyy"
          locale="pt-BR"
          placeholderText="Selecione a data inicial"
        />
        <span>Até</span>
        <DatePicker
          selected={finalDate}
          onChange={(date) => setFinalDate(date)}
          minDate={startDate!}
          maxDate={new Date()}
          disabled={!startDate}
          dateFormat="dd/MM/yyyy"
          locale="pt-BR"
          placeholderText="Selecione a data final"
        />
        <select
          name="status"
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          value={form.values.status}
        >
          <option value="">Todos os status</option>
          <option value="AGUARDANDO_APROVACAO">Aguardando Aprovação</option>
          <option value="PRODUCAO">Produção</option>
          <option value="PRONTO">Pronto</option>
          <option value="FINALIZADO">Finalizado</option>
          <option value="CANCELADO">Cancelado</option>
        </select>
        <S.BtnFilter type="submit">Filtrar</S.BtnFilter>
        <S.BtnLimpar
          type="button"
          onClick={() => {
            setStartDate(null)
            setFinalDate(null)
            form.resetForm()
          }}
        >
          Limpar filtros
        </S.BtnLimpar>
      </S.IntupsContainer>
    )
  }

  const buscaPage = (page: number) => {
    dispatch(atualizaCurrentPage(page))
  }

  return (
    <div className="container">
      <div>Registros</div>
      {filtro()}
      <S.Tabela>
        <thead>
          <tr>
            <th>Pedido</th>
            <th>Cliente</th>
            <th>Bairro</th>
            <th>Data</th>
            <th>Status</th>
            <th>Pagamento</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {[...items.orders]
            .sort((a, b) => b.id + a.id)
            .map((item) => (
              <S.Row key={item.id} backColor={item.status}>
                <td>#{item.id}</td>
                <td>{item.customer_name}</td>
                {item.addressJson ? (
                  <td>{item.addressJson.bairro}</td>
                ) : (
                  <td>Local</td>
                )}
                <td>{formatDateToBR(item.dateTime)}</td>
                <td>{item.status}</td>
                <td>{item.payment}</td>
                <td>{parseToBrl(item.totalPrice)}</td>
              </S.Row>
            ))}
        </tbody>
      </S.Tabela>
      <Navigation
        totalPage={items.totalPages}
        currentPage={pageAtual}
        onClick={(e) => {
          buscaPage(e)
        }}
        prevPage={() => {
          buscaPage(pageAtual - 1)
        }}
        nextPage={() => {
          buscaPage(pageAtual + 1)
        }}
      />
      <Loader isVisible={isLoading} />
    </div>
  )
}

export default RecordsPanel
