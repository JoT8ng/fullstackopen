/* eslint-disable react/prop-types */
import React, { createContext, useReducer } from 'react'

const notificationReducer = (state = null, action) => {
    switch (action.type) {
      case "SET_NOTIFICATION":
          return {
            message: action.message,
            timeout: action.timeout,
          }
      case "REMOVE_NOTIFICATION":
          return null
      default:
          return state
    }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, null)

    return (
        <NotificationContext.Provider value={[notification, notificationDispatch]}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export default NotificationContext