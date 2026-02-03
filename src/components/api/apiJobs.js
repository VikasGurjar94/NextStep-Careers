import SupabaseClient from "../../utils/supabase";


export async function getJobs(token, { location, company_id, search_query }) {
    const supabase = await SupabaseClient(token);

    let query = supabase.from("jobs").select("*, saved: saved_jobs(id), company: companies(name,logo_url)");

    if (location) {
        query.eq("location", location);
    }
    if (company_id) {
        query.eq("company_id", company_id);
    }
    if (search_query) {
        query.ilike("title", `%${search_query}%`)
    }

    const { data, error } = await query;

    if (error) {
        console.log("Error in fetching jobs : ", error);
        return null;
    }
    
    return data;
}

export async function saveJob(token, { alreadySaved }, saveData) {
    const supabase = await SupabaseClient(token);

    if (alreadySaved) {
        const { data, error: deletingError } = await supabase
            .from("saved_jobs")
            .delete()
            .eq("job_id", saveData.job_id);

        if (deletingError) {
            console.log("Error in deleting jobs : ", deletingError);
            return null;
        }
        return data;

    }
    else{
        const { data, error: insertingError } = await supabase
            .from("saved_jobs")
            .insert([saveData])
            .select();

        if (insertingError) {
            console.log("Error in deleting jobs : ", insertingError);
            return null;
        }
    }

    const { data, error } = await supabase
        .from("jobs")
        .select("*, saved: saved_jobs(id), company: companies(name,logo_url)");

    if (error) {
        console.log("Error in fetching jobs : ", error);
        return null;
    }
    return data;
}