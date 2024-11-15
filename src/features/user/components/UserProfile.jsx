import { useSelector, useDispatch } from 'react-redux';

import { selectUserInfo, updateUserAsync } from '../userSlice';

export default function UserProfile() {
  const user = useSelector(selectUserInfo);
  const dispatch = useDispatch();

  const handleEdit = (index) => {

  }

  const handleRemove = (e, index) => {
    const newUser = { ...user, addresses: [...user.addresses] };
    newUser.addresses.splice(index, 1);
    dispatch(updateUserAsync(newUser));
  }

  return (
    <div className="mx-auto max-w-7xl px-4 mt-12 bg-white py-6 sm:px-6 lg:px-8">
      <div className="border-t border-gray-200 px-4 py-6">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Name: {user.name ? user.name : "New User"}
        </h1>
        <h3 className='text-xl my-5 text-red-900 font-bold'>email address: {user.email}</h3>

        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          {user.addresses.map((address, index) => (
            <div className="flex justify-between gap-x-6 py-5 px-5 border-solid border-2 border-grey-200">
              <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    {address.name}
                  </p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                    {address.street}
                  </p>

                </div>
              </div>
              <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                <p className="text-sm leading-6 text-gray-900">{address.phone}</p>
                <p className="text-sm leading-6 text-gray-900">{address.city}</p>
              </div>
              <div className="hidden sm:flex sm:flex-col text-indigo-600 hover:text-indigo-500">
                <button
                  onClick={(e) => handleEdit(index)}
                  type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Edit
                </button>
                <button
                  onClick={(e) => handleRemove(e, index)}
                  type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}