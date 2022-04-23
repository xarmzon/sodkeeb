import { NavLink } from './types'

export const APP_NAME = 'SODKEEB TRADO MEDICAL CENTER'
export const DEFAULT_SEO = {
  title: 'Home of Good Herbal products',
  defaultTitle: APP_NAME,
  titleTemplate: `%s | ${APP_NAME}`,
  description: 'Home of Good Herbal products',
}
export const USER_TYPES = {
  ADMIN: 1,
  CLIENT: 0,
}
export const PER_PAGE = 10
export const ALLOWED_EXTENSIONS_FOR_DP = ['jpeg', 'jpg', 'png']
export const ALLOWED_FILE_SIZE_DP = 1024 * 800 // 800kb

export const ROUTES = {
  ACCOUNT: {
    LOGIN: '/account/login',
    LOGOUT: '/account/logout',
  },
  DASHBOARD: {
    OVERVIEW: '/dashboard',
    PRODUCTS: '/dashboard/products',
    NEW_PRODUCT: '/dashboard/products/new',
  },
  API: {
    LOGIN: 'auth',
    PRODUCTS: 'products',
  },
}

export const MESSAGES = {
  LOGOUT_SUCCESSFUL: 'Your account has been logged out successfully',
  NEW_PRODUCT_SUCCESSFUL: 'New Product created successfully',
  NEW_PRODUCT_ERROR:
    'An error occurred while adding the New Product, please try again',
  PRODUCT_UPDATED_SUCCESSFUL: 'Product updated successfully',
  PRODUCT_UPDATE_ERROR:
    'An error occurred while updating the Product, please try again',
  PRODUCT_DELETED_SUCCESSFUL: 'Product deleted successfully',
  PRODUCT_DELETE_ERROR:
    'An error occurred while deleting the Product, please try again',
  UNKNOWN_ERROR: 'Unknown Error occurred. Please try again',
  FORM_ERROR: 'Please fill the form properly',
  LOGIN_REQUIRED: 'Please login first before you can access that page',
  ADMIN_REQUIRED: 'Sorry! only Admin can access that page',
  ALREADY_LOGIN: 'Please Logout first before you can have access to that page',
  FETCH_LOADING_ERROR:
    'Error Occurred while fetching the data. Please try again',
  FETCH_LOADING_SUCCESS: 'Data Fetched successfully',
  PRODUCT_FETCH_SUCCESS: 'Products data fetched successfully',
  FETCH_LOADING_DATA: 'Loading Data.........',
  NO_DATA_TO_DISPLAY: 'SORRY! NO DATA AVAILABLE TO DISPLAY',
  NO_ACCESS_TO_ROUTE: "Oops! You don't have access to this page",
  GENERAL_ERROR_MESSAGE:
    'Oops! Something went wrong with your request. please try again',
  METHOD_NOT_ALLOWED: 'Sorry, Method not allowed or not yet supported',
}

export const HTTP_REQUEST_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
}

export const GENERAL_NAV_ITEMS1: NavLink[] = [
  {
    text: 'About Us',
    link: '#about',
  },
  {
    text: 'Products',
    link: '#products',
  },
  {
    text: 'Contact Us',
    link: '#contact',
  },
  {
    text: 'Admin',
    link: '/dashboard/products',
  },
]
export const GENERAL_NAV_ITEMS2: NavLink[] = [
  {
    text: 'About Us',
    link: '/#about',
  },
  {
    text: 'Products',
    link: '/#products',
  },
  {
    text: 'Contact Us',
    link: '#contact',
  },
  {
    text: 'Admin',
    link: '/dashboard/products',
  },
]
