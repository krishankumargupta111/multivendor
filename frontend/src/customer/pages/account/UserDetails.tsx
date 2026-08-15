import ProfileFieldCard from './ProfileFieldCard'
import { useAppSelector } from '../../../redux/store'

function UserDetails() {

  const {user}=useAppSelector(store=>store)
  return (

    <div className='space-y-5'>
      <ProfileFieldCard keys={"Name"} value={user.user?.fullName}/>
       <ProfileFieldCard keys={"Email"} value={user.user?.email}/>
        <ProfileFieldCard keys={"Mobile"} value={user.user?.mobile ||"not provided"}/>
    </div>
  )
}

export default UserDetails
