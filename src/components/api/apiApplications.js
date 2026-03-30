import supabaseClient, { supabaseUrl } from "../../utils/supabase";

// - Apply to job ( candidate )
// NOTE: DB schema uses "name" (NOT candidate_name) and has no "candidate_email" column.
// We map the frontend fields to the actual columns to avoid insert errors.
export async function applyToJob(token, _, jobData) {
  const supabase = await supabaseClient(token);

  const random = Math.floor(Math.random() * 90000);
  const fileName = `resume-${random}-${jobData.candidate_id}`;

  const { error: storageError } = await supabase.storage
    .from("resumes")
    .upload(fileName, jobData.resume);

  if (storageError) throw new Error("Error uploading Resume");

  const resume = `${supabaseUrl}/storage/v1/object/public/resumes/${fileName}`;

  // Only send columns that actually exist on the "applications" table
  const { candidate_name, candidate_email, ...rest } = jobData;

  const { data, error } = await supabase
    .from("applications")
    .insert([
      {
        ...rest,
        name: candidate_name, // maps to "name" column in DB
        resume,
      },
    ])
    .select();

  if (error) {
    console.error("Error submitting Application:", error);
    throw new Error("Error submitting Application");
  }

  return data;
}

export async function updateApplicationStatus(token, _, { application_id }, status) {
    const supabase = await supabaseClient(token);
    const { data, error } = await supabase
      .from("applications")
      .update({ status })
      .eq("id", application_id)
      .select();
  
    if (error || data.length === 0) {
      console.error("Error Updating Application Status:", error);
      return null;
    }
  
    return data;
  }
  
  export async function getApplications(token, { user_id }) {
    const supabase = await supabaseClient(token);
    const { data, error } = await supabase
      .from("applications")
      .select("*, job:jobs(title, company:companies(name))")
      .eq("candidate_id", user_id);
  
    if (error) {
      console.error("Error fetching Applications:", error);
      return null;
    }
  
    return data;
  }