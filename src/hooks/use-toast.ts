import * as React from "react"

export function useToast() {
  return {
    toast: ({ ...props }) => {
      console.log("Toast:", props);
    },
    dismiss: () => {},
    toasts: [],
  }
}
