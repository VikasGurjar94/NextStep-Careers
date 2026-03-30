import SupabaseClient from "../../utils/supabase";


export async function getJobs(token, { location, company_id, search_query }) {
    const supabase = await SupabaseClient(token);

    let query = supabase.from("jobs").select("*, saved: saved_jobs(id), company: companies(name,logo_url)");

    if (location) {
        query = query.eq("location", location);
    }
    if (company_id) {
        query = query.eq("company_id", company_id);
    }
    if (search_query) {
        query = query.ilike("title", `%${search_query}%`);
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

export async function getSingleJob(token , {job_id}) {
    const supabase = await SupabaseClient(token);

        const { data, error } = await supabase
            .from("jobs")
            .select('*,company: companies(name,logo_url) , applications : applications(*)')
            .eq("id" , job_id)
            .single() ;
            

        if (error) {
            console.log("Error in fetching Single Job : ", error);
            return null;
        }
        return data;
    
}

export async function updateHiringStatus(token , {job_id} , isOpen) {
    const supabase = await SupabaseClient(token);

        const { data, error } = await supabase
            .from("jobs")
            .update({isOpen})
            .eq("id" , job_id)
            .select() ;
            

        if (error) {
            console.log("Error in updating Job : ", error);
            return null;
        }
        return data;
    
}

export async function createJob(token, _, jobData) {
    const supabase = await SupabaseClient(token);

    // Ensure company_id is a number (database expects int8)
    const formattedJobData = {
        ...jobData,
        company_id: parseInt(jobData.company_id, 10),
    };

    const { data, error } = await supabase
        .from("jobs")
        .insert([formattedJobData])
        .select();

    if (error) {
        console.error("Error in creating job:", error);
        throw new Error(error.message || "Error creating job");
    }
    
    return data;
}

export async function getSavedJobs(token, { user_id }) {
    const supabase = await SupabaseClient(token);

    const { data, error } = await supabase
        .from("saved_jobs")
        .select("*, job:jobs(*, company:companies(name,logo_url))")
        .eq("user_id", user_id);

    if (error) {
        console.log("Error in fetching saved jobs : ", error);
        return null;
    }
    return data;
}

export async function getMyJobs(token, { recruiter_id }) {
    const supabase = await SupabaseClient(token);

    const { data, error } = await supabase
        .from("jobs")
        .select("*, company:companies(name,logo_url), applications:applications(*)")
        .eq("recruiter_id", recruiter_id)
        .order("created_at", { ascending: false });

    if (error) {
        console.log("Error in fetching my jobs : ", error);
        return null;
    }
    return data;
}