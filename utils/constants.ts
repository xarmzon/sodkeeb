import { NavLink } from './types'
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3007'

export const APP_NAME = 'SODKEEB TRADO MEDICAL CENTER'
export const DEFAULT_SEO = {
  title: 'Home of Good Herbal products',
  defaultTitle: APP_NAME,
  titleTemplate: `%s | ${APP_NAME}`,
  description: 'Home of Good Herbal products',
  openGraph: {
    type: 'website',
    url: SITE_URL,
    title: APP_NAME,
    description: `${APP_NAME} is a medical health center that has solutions to your problems such as Infertility, Weak Erection, Back & Waist Pain,Pile Related problems,Sexually Transmitted Diseases,Genital Infections,Diabetes,Gonorrhea,Low Sperm Count,Staphylococcus,Fibroid,Ulcer and all Internal & External health issues
    using Herbal and Natural Products.`,
    images: [
      {
        url: `${SITE_URL}/images/sodkeeb_slider1.jpg`,
        width: 573,
        height: 409,
        alt: `${APP_NAME} open graph image`,
      },
    ],
  },
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
  PRODUCT_DETAILS: '/product',
  DASHBOARD: {
    OVERVIEW: '/dashboard',
    PRODUCTS: '/dashboard/products',
    PRODUCT: '/dashboard/product',
  },
  API: {
    LOGIN: 'auth',
    PRODUCTS: 'products',
  },
}

export const MESSAGES = {
  LOGIN_SUCCESSFUL: 'Your account has been logged in successfully',
  LOGOUT_SUCCESSFUL: 'Your account has been logged out successfully',
  LOGIN_ERROR:
    "We can't logged you in right now, please check your email or password",
  NEW_PRODUCT_SUCCESSFUL: 'New Product created successfully',
  NEW_PRODUCT_ERROR:
    'An error occurred while adding the new product, please try again',
  PRODUCT_UPDATED_SUCCESSFUL: 'Product updated successfully',
  PRODUCT_UPDATE_ERROR:
    'An error occurred while updating the product, please try again',
  PRODUCT_DELETED_SUCCESSFUL: 'Product deleted successfully',
  PRODUCT_DELETE_ERROR:
    'An error occurred while deleting the product, please try again',
  NO_PRODUCT_FOUND: "Sorry! we can' find the product you're looking for",
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
  NO_DATA_TO_DISPLAY:
    'SORRY! NO PRODUCT DATA TO DISPLAY RIGHT NOW. PLEASE CHECK BACK LATER',
  NO_ACCESS_TO_ROUTE: "Oops! You don't have access to this page",
  GENERAL_ERROR_MESSAGE:
    'Oops! Something went wrong with your request. please try again',
  METHOD_NOT_ALLOWED: 'Sorry, Method not allowed or not yet supported',
  BAD_REQUEST: 'Sorry, Bad request',
  BAD_REQUEST_TOKEN: 'Sorry, Bad request. Invalid or expired token supplied',
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
