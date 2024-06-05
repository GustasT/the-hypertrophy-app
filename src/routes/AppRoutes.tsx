import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import Templates from "../pages/templates/Templates";
// import NewMesocycle from "../pages/new_mesocycle/NewMesocycle";
import MainLayout from "../layouts/MainLayout";
import NotFoundPage from "../pages/not_found_page/NotFoundPage";
import Exercises from "../pages/exercises/Exercises";
import WorkoutPage from "../pages/workout/WorkoutPage";
import MesocyclesPage from "../pages/mesocycles/MesocyclesPage";
import MesocycleWorkoutsPage from "../pages/mesocycles/MesocycleWorkoutsPage";
import WorkoutDetailsPage from "../pages/mesocycles/WorkoutDetailsPage";

const AppRoutes = () => {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/templates" element={<Templates />} />
          <Route path="/mesocycles" element={<MesocyclesPage />} />
          {/* <Route path="/newMesocycle" element={<NewMesocycle />} /> */}
          <Route path="exercises" element={<Exercises />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/workout" element={<WorkoutPage />} />
          <Route
            path="/mesocycles/:mesocycleId"
            element={<MesocycleWorkoutsPage />}
          >
            <Route path=":workoutId" element={<WorkoutDetailsPage />} />
          </Route>
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default AppRoutes;
