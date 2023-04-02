import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';

const fetchForm = async (setForm, id) => {
  const res = await fetch(process.env.API_URI+ "/api/events/"+ id +"/pay-form")  

  setForm((await res.json()).html)
}

const Test = () => {
  const [searchParams] = useSearchParams();
  let [form, setForm] = useState("");

  useEffect(() => {
    fetchForm(setForm, searchParams.id);
  }, [])
  
  return (
        <Layout>
            <div dangerouslySetInnerHTML={{__html: form}}>

            </div>
        </Layout>
        
    )
};

export default Test;