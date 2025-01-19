import ChatbotUI from '@/components/ChatbotUi'
import BirthDetailsForm from '@/components/Form'
import { NextPage } from 'next'

interface Props {}

const Page: NextPage<Props> = ({}) => {
  return <div className='relative'>
    <BirthDetailsForm/>
  </div>
}

export default Page