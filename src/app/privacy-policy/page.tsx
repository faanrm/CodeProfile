import { privacyPolicies } from "@/lib/contants";
import { karla } from "../fonts/font";
export default function Page() {
  return (
    <div
      className={`${karla.className} max-w-3xl mx-auto min-h-[100vh] p-6 pb-20`}
    >
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-4">
        Thank you for using our GitHub Profile Card Generator! Your privacy is
        very important to us, and we want to ensure that you understand how we
        handle your information.
      </p>
      {privacyPolicies.map((policy, i) => (
        <div key={i} className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">--&gt; {policy.title}</h2>
          <p className="mb-4">{policy.content}</p>
        </div>
      ))}
      <p className="mt-6 pb-10">
        If you have any questions or concerns about this Privacy Policy, please
        feel free to contact us.
      </p>
    </div>
  );
}
