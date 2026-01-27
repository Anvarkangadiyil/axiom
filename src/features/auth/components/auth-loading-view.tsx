import { Spinner } from "@/components/ui/spinner"

const AuthLoadingView = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-background">
        <Spinner className="siz-6 text-ring">

        </Spinner>

    </div>
  )
}

export default AuthLoadingView