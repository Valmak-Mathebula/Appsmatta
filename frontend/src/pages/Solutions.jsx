import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const solutions = [
  {
    title: "Excel Model Digitization",
    challenge:
      "Critical business calculations are managed in complex Excel workbooks that are difficult to maintain and share.",
    solution:
      "We convert the spreadsheet into a secure web application while preserving the existing calculations and business logic.",
    benefits: [
      "Single source of truth",
      "Secure user access",
      "Automatic calculations",
      "Cloud access",
    ],
  },
  {
    title: "Business Process Automation",
    challenge:
      "Manual forms, emails and repetitive tasks slow down operations.",
    solution:
      "We replace manual workflows with digital processes that automate approvals, notifications and reporting.",
    benefits: [
      "Reduced paperwork",
      "Faster approvals",
      "Improved productivity",
      "Better visibility",
    ],
  },
  {
    title: "Management Dashboards",
    challenge:
      "Management spends hours compiling reports from multiple spreadsheets.",
    solution:
      "Interactive dashboards provide real-time visibility into key business information.",
    benefits: [
      "Real-time reporting",
      "Better decisions",
      "Visual dashboards",
      "Centralized data",
    ],
  },
  {
    title: "Custom Business Applications",
    challenge:
      "Off-the-shelf software doesn't match the way your business works.",
    solution:
      "We develop applications around your existing business processes instead of forcing you to change them.",
    benefits: [
      "Built around your business",
      "Scalable",
      "Secure",
      "Easy to use",
    ],
  },
];

function Solutions() {
  return (
    <>
      <Navbar />

      <section className="bg-primary text-white py-5">
        <div className="container py-5">
          <h1 className="display-4 fw-bold">Solutions</h1>
          <p className="lead">
            Real business problems. Practical digital solutions.
          </p>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          {solutions.map((item) => (
            <div className="card shadow-sm border-0 mb-5" key={item.title}>
              <div className="card-body p-5">
                <h2 className="fw-bold mb-4">{item.title}</h2>

                <h5 className="text-danger">Challenge</h5>
                <p>{item.challenge}</p>

                <h5 className="text-primary">Solution</h5>
                <p>{item.solution}</p>

                <h5 className="text-success">Benefits</h5>

                <ul>
                  {item.benefits.map((benefit) => (
                    <li key={benefit}>{benefit}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Solutions;
