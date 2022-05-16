import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SECRET
);

export async function getAllTutorials() {
  const tutorials = await supabase.from('tutorials').select();

  return tutorials.data;
}

export async function getAllTutorialsByUser(user) {
  const tutorials = await supabase.from('tutorials').select().eq('by', user);

  return tutorials.data;
}

export async function getTutorial(id) {
  const tutorial = await supabase.from('tutorials').select().eq('id', id);

  if (!tutorial.data?.length) return null;

  return tutorial.data[0];
}

export async function createTutorial(by, title, contents) {
  const id = (await getAllTutorials()).sort((a, b) => b.id - a.id)[0].id + 1;

  const tutorial = await supabase
    .from('tutorials')
    .insert([{ id, by, title, contents }]);

  return tutorial.data[0];
}

export async function updateTutorial(id, title, contents) {
  const existing = await getTutorial(id);

  if (!existing) return null;

  const tutorial = await supabase
    .from('tutorials')
    .update({ title, contents })
    .eq('id', id);

  return tutorial.data[0];
}

export async function deleteTutorial(id) {
  const existing = await getTutorial(id);

  if (!existing) return null;

  const tutorial = await supabase.from('tutorials').delete().eq('id', id);

  return tutorial.data[0];
}
