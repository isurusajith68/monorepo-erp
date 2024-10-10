import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'
import Template1 from './template-1/page'
import RootLayout from './rootlayout'
import Template2 from './template-2/page'

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route path="template-1" element={<Template1 />} />
      <Route path="template-2" element={<Template2 />} />
    </Route>,
  ),
)
