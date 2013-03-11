﻿var sessions = [];

//User roles list
var userRoles = {
   Admin: "administrator",
   User: "user",
   Supervisor: "supervisor"
};

var sessionManagement = {
   indexOf: function (sessionId) {
      for (var i in sessions) {
         if (sessions[i].sessionId == sessionId)
            return i;
      }

      return null;
   },
   indexOfUser: function (userId) {
      for (var i in sessions) {
         if (sessions[i].userId == userId)
            return i;
      }

      return null;
   },

   add: function (sessionData) {
      sessions.push(sessionData);
   },
   remove: function (sessionId) {
      var index = this.indexOf(sessionId);
      if (index != null) {
         sessions.splice(index, 1);
      } else {
         return null;
      }
   },
   removeByUserId: function (userId) {
      var index = this.indexOf(userId);
      if (index != null) {
         sessions.splice(index, 1);
      } else {
         return null;
      }
   },

   getSessionById: function (userId) {
      var index = this.indexOfUser(userId);
      if (index != null) {
         return sessions[index];
      } else {
         return null;
      }
   },
   getSessionByUserId: function (sessionId) {
      var index = this.indexOfUser(userId);
      if (index != null) {
         return sessions[index];
      } else {
         return null;
      }
   },

   isAdmin: function (userId) {
      var index = this.indexOfUser(userId);
      if (index != null) {
         if (users[index].role == userRoles.Admin) {
            return true;
         } else {
            return false;
         }
      } else {
         return null;
      }
   },
   getUsersByRole: function (role) {
      var usersByRole = [];
      for (var i in users) {
         if (users[i].role == role)
            usersByRole.push(users[i]);
      }

      return usersByRole;
   }
};

module.exports = sessionManagement;