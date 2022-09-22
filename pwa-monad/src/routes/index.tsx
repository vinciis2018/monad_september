import { Routes, Route, Navigate } from "react-router-dom";
// pages
import {
  // onboarding
  Welcome,
  KeyManagement,
  KeyPhraseSave,
  KeyConfirm,
  KeyRecovery,
  PinCreate,
  PinSuccess,
  // CameraHome,
  Active,
  PhotoView,
  UploadConfirm,
  Success,
  UploadTags,
  UploadArchive,
  // auth
  Login,
  Logout,
  // setting
  Setting,
  Recovery,
  RecoveryView,
  WifiTesting,
  SelfDestructPin,
  SelfDestruct,
  SelfDestructPinSuccess,
  Advanced,
  UpdatePin,
  UpdatePinSuccess,
  // other
  Page404,
  Signin,
  Signup,
  Home,
  MapBox,
  Screens,
  ScreenDetails,
  ScreenPlayer,
  Adverts,
  AdvertDetails,
  UserProfile,
  ScreenEdit,
  AdvertCreate,
  AdvertEdit,
  ScreenDashboard,
  UserDashboard,
  CampaignDashboard,
  PleaBucket,
} from "pages";
import { Nav, Footer } from "components/common";

export const PublicRoutes = () => {
  return (
    <>
      <Nav />
      <Routes>
        {/* onboarding */}
        <Route path="/" element={<Home />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/key-management" element={<KeyManagement />} />
        <Route path="/key-phrase-save" element={<KeyPhraseSave />} />
        <Route path="/key-confirm" element={<KeyConfirm />} />
        <Route path="/key-recovery" element={<KeyRecovery />} />
        <Route path="/pin-create" element={<PinCreate />} />
        <Route path="/pin-success" element={<PinSuccess />} />
        {/* auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        {/* upload */}
        <Route path="/upload" element={<Active />} />
        <Route path="/upload-active" element={<Active />} />
        <Route path="/upload-photos" element={<PhotoView />} />
        <Route path="/upload-tags" element={<UploadTags />} />
        <Route path="/upload-confirm" element={<UploadConfirm />} />
        <Route path="/upload-success/:cid" element={<Success />} />
        <Route path="/upload-archive" element={<UploadArchive />} />
        {/* setting */}
        <Route path="/setting/wifi-test" element={<WifiTesting />} />
        <Route path="/setting/recovery" element={<Recovery />} />
        <Route path="/setting/phrase-view" element={<RecoveryView />} />
        <Route
          path="/setting/update-pin-success"
          element={<UpdatePinSuccess />}
        />
        <Route path="/setting/update-pin" element={<UpdatePin />} />
        <Route
          path="/setting/self-destruct-pin"
          element={<SelfDestructPin />}
        />
        <Route
          path="/setting/self-destruct-pin-success"
          element={<SelfDestructPinSuccess />}
        />
        <Route path="/setting/self-destruct" element={<SelfDestruct />} />
        <Route path="/setting/advanced" element={<Advanced />} />
        <Route path="/setting" element={<Setting />} />

        <Route path="/home" element={<Navigate to="/" />} />
        <Route path="/mapbox" element={<MapBox />} />
        <Route path="/mapbox/:screen" element={<MapBox />} />

        <Route path="/screens" element={<Screens />} />
        <Route path="/screen/:id" element={<ScreenDetails />} />
        <Route path="/screen/:id/:txId" element={<ScreenDetails />} />
        <Route path="/screen/:id/:txId/:gameId" element={<ScreenDetails />} />
        <Route path="/myscreen/play/:id" element={<ScreenPlayer />} />
        <Route path="/edit/screen/:id" element={<ScreenEdit />} />

        <Route path="/adverts" element={<Adverts />} />
        <Route path="/advert/:id" element={<AdvertDetails />} />
        <Route path="/advert/:id/:txId" element={<AdvertDetails />} />
        <Route path="/advert/:id/:txId/:screenId" element={<AdvertDetails />} />
        <Route
          path="/createCampaign/:screenId/:userId"
          element={<AdvertCreate />}
        />
        <Route
          path="/editAdvert/:id/:txId/:screenId"
          element={<AdvertEdit />}
        />

        <Route path="/userProfile/:id/:wallet" element={<UserProfile />} />

        <Route path="/dashboard/screen/:id" element={<ScreenDashboard />} />
        <Route path="/dashboard/user/:id" element={<UserDashboard />} />
        <Route
          path="/dashboard/campaign/:id/:txId"
          element={<CampaignDashboard />}
        />

        <Route path="/pleaBucket" element={<PleaBucket />} />

        {/* <Route path="/wallet/:id/:wallet" element={<Wallet />} /> */}

        <Route path="*" element={<Page404 />} />
      </Routes>
      <Footer />
    </>
  );
};
