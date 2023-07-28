import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Contact, Home, Layout, Login, Stays } from "../Screens";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/stay" element={<Stays />} />

      <Route path="/sign-in" element={<Login />} />
    </Route>
  )
);
