import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'
import RootLayout from './RootLayout'
import Home from '@/components/Home'
import Test from '@/components/text'
import { InputForm } from '@/components/test2'

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />}></Route>
      <Route path="/features" element={<Test />}></Route>
      <Route path="/Pricing" element={<Test />}></Route>
      <Route path="/blog" element={<InputForm />}></Route>
    </Route>,
  ),
)
