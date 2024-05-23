/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 */

interface IRoute {
  path?: string;
  icon?: string;
  name: string;
  routes?: IRoute[];
  checkActive?(pathname: String, route: IRoute): boolean;
  exact?: boolean;
  roles?: string[];
}

export function routeIsActive(pathname: String, route: IRoute): boolean {
  if (route.checkActive) {
    return route.checkActive(pathname, route);
  }

  return route?.exact
    ? pathname == route?.path
    : route?.path
    ? pathname.indexOf(route.path) === 0
    : false;
}

const routes: IRoute[] = [
  {
    path: "/", // the url
    icon: "HomeIcon", // the component being exported from icons/index.js
    name: "Dashboard", // name that appear in Sidebar
    exact: true,
    roles: ["SuperAdmin", "Director", "StudentAffairsService"],
  },
  {
    path: "/user",
    icon: "OutlinePersonIcon",
    name: "Users",
    exact: true,
    roles: ["SuperAdmin", "Director"],
  },
  {
    path: "#", // the url
    icon: "DepartmentIcon", // the component being exported from icons/index.js
    name: "Departments", // name that appear in Sidebar
    exact: true,
    roles: ["SuperAdmin"],
  },
  {
    path: "#", // the url
    icon: "SpecialityIcon", // the component being exported from icons/index.js
    name: "Specialities", // name that appear in Sidebar
    exact: true,
    roles: ["SuperAdmin", "Director"],
  },
  {
    path: "#", // the url
    icon: "LevelIcon", // the component being exported from icons/index.js
    name: "Levels", // name that appear in Sidebar
    exact: true,
    roles: ["SuperAdmin", "Director"],
  },
  {
    path: "#", // the url
    icon: "ClassIcon", // the component being exported from icons/index.js
    name: "Classes", // name that appear in Sidebar
    exact: true,
    roles: ["SuperAdmin", "Director", "StudentAffairsService"],
  },
  {
    path: "#", // the url
    icon: "GroupIcon", // the component being exported from icons/index.js
    name: "Groups", // name that appear in Sidebar
    exact: true,
    roles: ["SuperAdmin", "Director", "StudentAffairsService"],
  },
  {
    path: "#", // the url
    icon: "RoomIcon", // the component being exported from icons/index.js
    name: "Rooms", // name that appear in Sidebar
    exact: true,
    roles: ["SuperAdmin", "Director", "StudentAffairsService"],
  },
  {
    path: "/student",
    icon: "StudentIcon",
    name: "Students",
    exact: true,
    roles: ["SuperAdmin", "Director", "StudentAffairsService"],
  },
  {
    path: "/schedule",
    icon: "ScheduleIcon",
    name: "Schedules",
    exact: true,
    roles: ["SuperAdmin", "Director", "StudentAffairsService"],
  },
  {
    path: "/exam",
    icon: "ExamIcon",
    name: "Exams",
    exact: true,
    roles: ["SuperAdmin", "Director", "StudentAffairsService"],
  },
];

export type { IRoute };
export default routes;
