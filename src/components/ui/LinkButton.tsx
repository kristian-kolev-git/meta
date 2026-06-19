interface LinkButtonProps {
  children: React.ReactNode
  onClick?: () => void
}

export function LinkButton({ children, onClick }: LinkButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-sm font-medium text-primary hover:text-primary-hover"
    >
      {children}
    </button>
  )
}
