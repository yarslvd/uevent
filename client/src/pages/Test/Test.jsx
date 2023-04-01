import { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';

const fetchForm = async (setForm) => {
  const res = await fetch("http://ec2-54-202-53-115.us-west-2.compute.amazonaws.com:4000/api/events/1/pay-form")  

  setForm((await res.json()).html)
}

const Test = () => {
  let [form, setForm] = useState("");

  useEffect(() => {
    fetchForm(setForm);
  }, [])
  
  return (
        <Layout>
            <div dangerouslySetInnerHTML={{__html: form}}>

            </div>
        </Layout>
        
    )
};

export default Test;