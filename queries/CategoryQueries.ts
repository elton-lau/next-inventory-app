import { useQuery, useMutation } from '@tanstack/react-query';
import { supabase } from "../utils/supabaseClient";

// const getCategories = async () => {
//   const { data } = await axios.get('/categories');
//   return data
// }

const getCategories = async () => {
  const { data, error } = await supabase.from('categories').select('*, products(*)')

  if(error) {
    throw new Error(error.message)
  }

  return data
}

function useGetCategories() {
  return useQuery(['categories'], getCategories)
}

const postCategory = async (category) => {
  const {error } = await supabase.from('categories').upsert(category).single()
  if (error) {
    throw new Error(error.message)
  }
}

const usePostCategory = () => { return useMutation(['postCategory'], postCategory)}

export { useGetCategories, usePostCategory }