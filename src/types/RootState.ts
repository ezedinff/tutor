import { SignUpState } from 'app/containers/SignUp/types';
import { AppMessagesState } from 'app/containers/AppMessages/types';
import { LogInState } from 'app/containers/LogIn/types';
import { DashboardLayoutState } from 'app/containers/DashboardLayout/types';
import { TeacherProfileState } from 'app/containers/TeacherProfile/types';
import { TeacherSchedulesState } from 'app/containers/TeacherSchedules/types';
import { ClientLayoutState } from 'app/containers/ClientLayout/types';
import { UserLayoutState } from 'app/containers/UserLayout/types';
import { FindTutorState } from 'app/containers/FindTutor/types';
import { MakeRequestState } from 'app/containers/MakeRequest/types';
// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
  signUp?: SignUpState;
  appMessages?: AppMessagesState;
  logIn?: LogInState;
  dashboardLayout?: DashboardLayoutState;
  teacherProfile?: TeacherProfileState;
  teacherSchedules?: TeacherSchedulesState;
  clientLayout?: ClientLayoutState;
  userLayout?: UserLayoutState;
  findTutor?: FindTutorState;
  makeRequest?: MakeRequestState;
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}
