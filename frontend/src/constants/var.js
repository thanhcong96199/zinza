import { message } from 'antd';

export const domain = ''

export const dashboardRoute = domain + '/dashboard'

export const createUserRoute = domain + '/users/create'
export const updateUserRoute = domain + '/users/update'
export const usersRoute = domain + '/users'
export const userDetailRoute = domain + '/users/info'
export const userDeleteRoute = domain + '/users/delete'

export const containersRoute = domain + '/containers'
export const containersCreateRoute = domain + '/containers/create'
export const containersDetailRoute = domain + '/containers/detail'

export const templatesRoute = domain + '/templates'
export const templatesCreateRoute = domain + '/templates/create'
export const templatesDetailRoute = domain + '/templates/detail'
export const templatesUsersRoute = domain + '/templates/users'
export const templatesUpdateRoute = domain + '/templates/edit'

export const loginRoute = domain + '/login'
export const logoutRoute = domain + '/logout'

export const mess = {
  show: function(type = 'success', mess = 'Thành công!', duration = 1) {
    switch(type) {
      case 'success':
        message.success(mess, duration)
        break;
      case 'error':
        message.error(mess, duration)
        break;
      default:
        message.info(mess, duration)
    }
  }
}
