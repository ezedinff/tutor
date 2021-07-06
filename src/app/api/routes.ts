const routes = {
  phoneVerification: {
    sendSMS: '/phone-verification/send-sms-code',
    verifyCode: '/phone-verification/verify-phone-code',
  },
  auth: {
    login: '/auth/login',
    refreshToken: '/auth/token',
    me: '/auth/me',
  },
  user: {
    create: '/users',
    update: '/users',
    uploadTeacherDoc: '/users/upload-teacher-document',
    getImportantDocument: '/users/important-file',
    deleteImportantDocument: '/users/delete-teacher-document',
    findTutor: '/users/filter-tutor',
  },

  external: {
    geocode: 'https://maps.googleapis.com/maps/api/geocode/json',
  },
};

export default routes;
