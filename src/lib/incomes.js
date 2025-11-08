import { supabase } from '@/lib/supabaseClient';

// incomes: id, owner_id, client_id, amount(numeric), date(date), remark(text), uploaded_path(text), created_at



export async function listIncomes({ from, to, limit = 200 } = {}) {
  let q = supabase.from('incomes').select('*').order('date', { ascending: false }).limit(limit);
  if (from) q = q.gte('date', from);
  if (to) q = q.lte('date', to);

  const { data, error } = await q;
  if (error) throw error;

  return (data ?? []).map((r) => {
    // if uploaded_path is present and bucket is public, create a public URL for UI
    const uploaded = r.uploaded_path ? supabase.storage.from('invoices').getPublicUrl(r.uploaded_path).data?.publicUrl : '';
    return {
      id: r.id,
      customer: r.customer_name ?? '',
      amount: r.amount ?? 0,
      date: r.date ?? '',
      remark: r.remark ?? '',
      uploaded: uploaded || r.uploaded_path || '',
    };
  });
}

export async function createIncome({ customer, amount, date, remark, uploaded_path }) {
  const { data, error } = await supabase
    .from('incomes')
    .insert([
      {
        customer_name: customer,
        amount: Number(amount),
        date,
        remark,
        uploaded_path: uploaded_path || null,
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateIncome(id, patch) {
  const { data, error } = await supabase
    .from('incomes')
    .update({
      customer_name: patch.customer,
      amount: Number(patch.amount),
      date: patch.date,
      remark: patch.remark,
      uploaded_path: patch.uploaded || null,
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}


export async function deleteIncome(id) {
  const { error } = await supabase.from('incomes').delete().eq('id', id);
  if (error) throw error;
  return true;
}
