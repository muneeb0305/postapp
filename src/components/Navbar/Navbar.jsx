import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Link, useNavigate } from 'react-router-dom'
import Breadcrumbs from '../Breadcrumb/Breadcrumbs'
// import { Logout } from '../../features/Auth/AuthSlice';
import Alert from '../Alert/Alert'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  // const toggle = useSelector(state => state.appState.darkMode)
  // const open = useSelector((state) => state.appState.open)
  const navigate = useNavigate()
  // const dispatch = useDispatch()

  const handleLogout = () => {
    Alert({ icon: 'success', title: 'Logout Successfully' })
    // dispatch(Logout())
    navigate('/');
  }
  return (
    <Disclosure as="nav" className={`bg-white border-2 rounded-md shadow-lg  w-full z-10  fixed`}>
      <div className=''>
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 ">
          <div className={`relative flex h-16 items-center justify-between`}>
            <Breadcrumbs />
            <div className="absolute inset-y-0 right-14 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

              {/* Profile dropdown */}
              <Menu as="div" className="relative ml-3">
                <div>
                  <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="/"
                          className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                        >
                          Your Profile
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="/"
                          className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                        >
                          Settings
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to={'/'}
                          onClick={handleLogout} className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                        >
                          Sign out
                        </Link>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>
      </div>
    </Disclosure>
  )
}