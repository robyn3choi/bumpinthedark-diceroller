'use client'

import { toast, Toaster, ToastBar } from 'react-hot-toast'
import { TbX } from 'react-icons/tb'

export default function Toast() {
  return (
    <Toaster
      toastOptions={{
        className: '!max-w-full text-xs xs:text-base !bg-grey !text-white',
        duration: Infinity,
      }}
    >
      {(t) => (
        <ToastBar toast={t}>
          {({ icon, message }) => (
            <>
              {icon}
              {message}
              {t.type !== 'loading' && (
                <button onClick={() => toast.dismiss(t.id)}>
                  <TbX />
                </button>
              )}
            </>
          )}
        </ToastBar>
      )}
    </Toaster>
  )
}
