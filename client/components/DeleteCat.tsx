import { useNavigate } from 'react-router-dom'
import { IfAuthenticated } from './Authenticated.tsx'
import { Link } from 'react-router-dom'
import { deleteMissingCatApi } from '../apis/api-cats.ts'
import { useQueryClient, useMutation } from '@tanstack/react-query'

type props = {  
  catId: number
}
export default function DeleteCat( {catId} : props) {
  const cat = catId
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const deleteCatMutuation = useMutation( deleteMissingCatApi, {
    onSuccess: async () => {
      queryClient.invalidateQueries(['MissingCat'])
      navigate(`/foundcats`)
    }
  })

  const handleDelete = () => {
    try {
      deleteCatMutuation.mutate( catId )
    } catch (error: any) {
      console.log('Error removing cat')
    }
  }
    return (
        <>
        <IfAuthenticated>
        <div className="cats-card__link">
          <Link
            className="cats-card-link"
            to={`/missingcats/singlecat/${catId}`}
            onClick={handleDelete}>
            Delete Cat
           </Link>
        </div>
        </IfAuthenticated>
        </>
    )
}
