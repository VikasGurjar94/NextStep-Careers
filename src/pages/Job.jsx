import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import MDEditor from "@uiw/react-md-editor";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { Briefcase, DoorClosed, DoorOpen, MapPinIcon, FileText, CheckCircle, XCircle, Clock } from "lucide-react";
import useFetch from "../components/hooks/UseFetch";
import { getSingleJob, updateHiringStatus } from "../components/api/apiJobs";
import { applyToJob, updateApplicationStatus } from "../components/api/apiApplications";

const Job = () => {
  const { id } = useParams();
  const { isLoaded, user } = useUser();
  const navigate = useNavigate();
  const [applicationData, setApplicationData] = useState({
    candidate_name: "",
    candidate_email: "",
    resume: null,
  });
  const [showApplicationForm, setShowApplicationForm] = useState(false);

  const {
    loading: loadingJob,
    data: job,
    fn: fnJob,
  } = useFetch(getSingleJob, {
    job_id: id,
  });

  const { loading: loadingHiringStatus, fn: fnHiringStatus } = useFetch(
    updateHiringStatus,
    {
      job_id: id,
    }
  );

  const { loading: loadingApply, fn: fnApply } = useFetch(applyToJob);

  const { loading: loadingUpdateStatus, fn: fnUpdateStatus } = useFetch(
    updateApplicationStatus
  );

  useEffect(() => {
    if (isLoaded) fnJob();
  }, [isLoaded]);

  const handleStatusChange = (value) => {
    const isOpen = value === "open";
    fnHiringStatus(isOpen).then(() => fnJob());
  };

  const handleApplicationChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "resume") {
      setApplicationData(prev => ({
        ...prev,
        resume: files[0]
      }));
    } else {
      setApplicationData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleApplicationSubmit = async (e) => {
    e.preventDefault();
    
    if (!applicationData.candidate_name || !applicationData.candidate_email || !applicationData.resume) {
      alert("Please fill in all fields and upload a resume");
      return;
    }

    const jobData = {
      job_id: id,
      candidate_id: user.id,
      // candidate_name is mapped to the "name" column in the applications table inside the API
      candidate_name: applicationData.candidate_name,
      candidate_email: applicationData.candidate_email,
      resume: applicationData.resume,
    };

    try {
      const result = await fnApply(jobData);
      if (result) {
        alert("Application submitted successfully!");
        setShowApplicationForm(false);
        setApplicationData({ candidate_name: "", candidate_email: "", resume: null });
        fnJob(); // Refresh job data
      }
    } catch (error) {
      alert("Failed to submit application. Please try again.");
    }
  };

  const handleApplicationStatusUpdate = async (applicationId, status) => {
    if (!applicationId) return;
    await fnUpdateStatus({ application_id: applicationId }, status);
    fnJob();
  };

  const isRecruiter = job?.recruiter_id === user?.id;
  const isCandidate = user?.unsafeMetadata?.role === "candidate";
  const hasApplied = job?.applications?.some(app => app.candidate_id === user?.id);

  if (!isLoaded || loadingJob) {
    return <BarLoader className="mb-4 w-full " width={"100%"} color="#36d7b7" />;
  }

  if (!job) {
    return (
      <div className="text-center mt-20">
        <p className="text-xl text-gray-400">Job not found</p>
        <button
          onClick={() => navigate("/jobs")}
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-md"
        >
          Back to Jobs
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 mt-5 mx-20">
      <div className="flex flex-col-reverse gap-6 md:flex-row justify-between items-center">
        <h1 className="gradient-title font-extrabold pb-3 text-4xl sm:text-6xl">
          {job?.title}
        </h1>
        <img src={job?.company?.logo_url} className="h-12" alt={job?.title} onError={(e) => { e.target.style.display = 'none' }} />
      </div>

      <div className="flex justify-between flex-wrap gap-4">
        <div className="flex gap-2 items-center">
          <MapPinIcon size={20} /> <span className="capitalize">{job?.location}</span>
        </div>
        <div className="flex gap-2 items-center">
          <Briefcase size={20} /> <span>{job?.applications?.length || 0} Applicants</span>
        </div>
        <div className="flex gap-2 items-center">
          {job?.isOpen ? (
            <>
              <DoorOpen size={20} /> <span>Open</span>
            </>
          ) : (
            <>
              <DoorClosed size={20} /> <span>Closed</span>
            </>
          )}
        </div>
      </div>

      {isRecruiter && (
        <select
          value={job?.isOpen ? "open" : "closed"}
          onChange={(e) => handleStatusChange(e.target.value)}
          className={`w-full max-w-md p-2 border rounded-md text-white appearance-none cursor-pointer ${
            job?.isOpen ? "bg-green-950 border-green-500" : "bg-red-950 border-red-500"
          }`}
        >
          <option value="open">Hiring Status ( Open )</option>
          <option value="closed">Hiring Status ( Closed )</option>
        </select>
      )}

      <h2 className="text-2xl sm:text-3xl font-bold">About the job</h2>
      <p className="sm:text-lg text-gray-300">{job?.description}</p>

      <h2 className="text-2xl sm:text-3xl font-bold">
        What we are looking for
      </h2>
      <div className="bg-black/30 p-4 rounded-lg">
        <MDEditor.Markdown
          source={job?.requirements}
          className="bg-transparent sm:text-lg"
        />
      </div>

      {/* Application Section */}
      {isCandidate && job?.isOpen && (
        <div className="border border-white/20 rounded-lg p-6 bg-black/20">
          {hasApplied ? (
            <div className="text-center">
              <CheckCircle className="mx-auto mb-4 text-green-400" size={48} />
              <p className="text-xl font-semibold mb-2">You've already applied for this job!</p>
              <p className="text-gray-400">Check your application status in your profile.</p>
            </div>
          ) : (
            <>
              {!showApplicationForm ? (
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-4">Interested in this position?</h3>
                  <button
                    onClick={() => setShowApplicationForm(true)}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-md transition-colors"
                  >
                    Apply Now
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplicationSubmit} className="space-y-4">
                  <h3 className="text-2xl font-bold mb-4">Application Form</h3>
                  
                  <div>
                    <label className="block text-lg mb-2">Full Name</label>
                    <input
                      type="text"
                      name="candidate_name"
                      value={applicationData.candidate_name}
                      onChange={handleApplicationChange}
                      className="w-full px-4 py-2 rounded-md bg-black/50 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-lg mb-2">Email</label>
                    <input
                      type="email"
                      name="candidate_email"
                      value={applicationData.candidate_email}
                      onChange={handleApplicationChange}
                      className="w-full px-4 py-2 rounded-md bg-black/50 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-lg mb-2">Resume (PDF)</label>
                    <input
                      type="file"
                      name="resume"
                      accept=".pdf,.doc,.docx"
                      onChange={handleApplicationChange}
                      className="w-full px-4 py-2 rounded-md bg-black/50 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="submit"
                      disabled={loadingApply}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-md transition-colors disabled:opacity-50"
                    >
                      {loadingApply ? "Submitting..." : "Submit Application"}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowApplicationForm(false);
                        setApplicationData({ candidate_name: "", candidate_email: "", resume: null });
                      }}
                      className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-md transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </>
          )}
        </div>
      )}

      {/* Applications List for Recruiter */}
      {isRecruiter && job?.applications && job.applications.length > 0 && (
        <div className="border border-white/20 rounded-lg p-6 bg-black/20">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">Applications ({job.applications.length})</h2>
          
          <div className="space-y-4">
            {job.applications.map((application) => (
              <div
                key={application.id}
                className="border border-white/20 rounded-lg p-4 bg-black/30"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">{application.name || "Anonymous"}</h3>
                    <div className="flex items-center gap-2 mt-2">
                      {application.status === "accepted" && (
                        <span className="flex items-center gap-1 text-green-400">
                          <CheckCircle size={16} /> Accepted
                        </span>
                      )}
                      {application.status === "rejected" && (
                        <span className="flex items-center gap-1 text-red-400">
                          <XCircle size={16} /> Rejected
                        </span>
                      )}
                      {(!application.status || application.status === "pending") && (
                        <span className="flex items-center gap-1 text-yellow-400">
                          <Clock size={16} /> Pending
                        </span>
                      )}
                    </div>
                  </div>
                  {application.resume && (
                    <a
                      href={application.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-400 hover:text-blue-300 underline"
                    >
                      <FileText size={20} />
                      View Resume
                    </a>
                  )}
                </div>
                
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => handleApplicationStatusUpdate(application.id, "accepted")}
                    disabled={loadingUpdateStatus || application.status === "accepted"}
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleApplicationStatusUpdate(application.id, "rejected")}
                    disabled={loadingUpdateStatus || application.status === "rejected"}
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {isRecruiter && (!job?.applications || job.applications.length === 0) && (
        <div className="border border-white/20 rounded-lg p-6 bg-black/20 text-center">
          <p className="text-gray-400">No applications yet.</p>
        </div>
      )}
    </div>
  );
};

export default Job;
