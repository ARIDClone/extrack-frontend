/* eslint-disable react/no-children-prop */
import { HashRouter, Route, Routes } from 'react-router-dom'
import {
  Callback,
  Dashboard,
  Error,
  Login,
  PORequestForm,
  PORequestList,
} from './pages'
import { Layout } from './components'

const App = () => {
  return (
    <HashRouter>
      <Routes>
        {/* <Route path='/login' element={<Login />} /> */}
        <Route path='/callback' element={<Callback />} />
        <Route
          path='/'
          element={
            <Layout headerTitle={'EXPENSE TRACKING'} children={<Dashboard />} />
          }
        />
        <Route path='/po'>
          <Route
            path='request'
            element={
              <Layout
                headerTitle={'EXPENSE TRACKING'}
                children={<PORequestList />}
              />
            }
          />
          <Route
            path='form'
            element={
              <Layout
                headerTitle={'EXPENSE TRACKING'}
                children={<PORequestForm />}
              />
            }
          />
          <Route
            path='form/:id'
            element={
              <Layout
                headerTitle={'EXPENSE TRACKING'}
                children={<PORequestForm />}
              />
            }
          />
        </Route>

        <Route path='/error/:code' element={<Error />}></Route>
      </Routes>
    </HashRouter>
  )
}

export default App
