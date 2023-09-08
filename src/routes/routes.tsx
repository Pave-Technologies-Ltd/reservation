import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  // useSearchParams
} from "react-router-dom";
import { Contact, Home, Layout, Login, SearchResults, SingleProperty, Stays } from "../Screens";
//  const [searchParams] = useSearchParams();
//  const room = searchParams.get("room") as string;
//  const adult = searchParams.get("adult") as string;
//  const checkin_date = searchParams.get("checkin_date") as string;
//  const checkout_date = searchParams.get("checkout_date") as string;
//  const dest_type = searchParams.get("dest_type") as string;
//  const dest_id = searchParams.get("dest_id") as string;
//  const children_number = searchParams.get("children_number") as string;
//  const cityName = searchParams.get("CN") as string;

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/stay" element={<Stays />} />

      <Route path="/sign-in" element={<Login />} />
      <Route
        // path={`/searchresults?CN=${cityName}&room=${room}&adult=${adult}&children_number=${children_number}&checkin_date=${checkin_date}&checkout_date=${checkout_date}&dest_type=${dest_type}&dest_id=${dest_id}`}
        path={`/searchresults`}
        element={<SearchResults />}
      />
      <Route path="/property/:propertyId" element={<SingleProperty />} />
    </Route>
  )
);
