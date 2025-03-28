import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Users.css";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [hoveredUserIdAddress, setHoveredUserIdAddress] = useState<
    number | null
  >(null);
  const [hoveredUserIdCompany, setHoveredUserIdCompany] = useState<
    number | null
  >(null);

  useEffect(() => {
    axios
      .get<User[]>("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (response.status === 200) {
          setUsers(response.data);
        } else {
          setError(`Error: Received status code ${response.status}`);
        }
        setLoading(false);
      })
      .catch((error) => {
        if (error.response) {
          // Server responded with a status other than 2xx
          setError(
            `Error: ${error.response.status} - ${error.response.statusText}`
          );
        } else if (error.request) {
          // Request was made but no response received
          setError("Error: No response received from server");
        } else {
          // Something else happened
          setError(`Error: ${error.message}`);
        }
        setLoading(false);
      });
  }, []);

  const handleMouseEnterAddress = (user: User) => {
    setHoveredUserIdAddress(user.id);
  };
  const handleMouseEnterCompany = (user: User) => {
    setHoveredUserIdCompany(user.id);
  };

  const handleMouseLeaveAddress = () => {
    setHoveredUserIdAddress(null);
  };
  const handleMouseLeaveCompany = () => {
    setHoveredUserIdCompany(null);
  };

  if (loading)
    return (
      <div className="loading-container d-flex justify-content-center align-items-center">
        <p className="text-white">Loading...</p>
      </div>
    );
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <section className="intro">
      <div className="bg-image h-100">
        <div className="mask d-flex align-items-center h-100">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12">
                <div className="card mask-custom">
                  <div className="card-body ">
                    <div className="table-responsive">
                      <table className="table table-borderless text-white mb-0">
                        <thead>
                          <tr>
                            <th scope="col">ID</th>
                            <th scope="col">NAME</th>
                            <th scope="col">USERNAME</th>
                            <th scope="col">EMAIL</th>
                            <th scope="col">PHONE</th>
                            <th scope="col">WEBSITE</th>
                            <th scope="col">ADDRESS</th>
                            <th scope="col">COMPANY</th>
                          </tr>
                        </thead>
                        <tbody>
                          {users.map((user) => (
                            <tr key={user.id}>
                              <th scope="row">{user.id}</th>
                              <td>{user.name}</td>
                              <td>{user.username}</td>
                              <td>{user.email}</td>
                              <td>{user.phone}</td>
                              <td>
                                <a
                                  style={{ color: "white" }}
                                  href={
                                    user.website.startsWith("http")
                                      ? user.website
                                      : `https://${user.website}`
                                  }
                                >
                                  {user.website}
                                </a>
                              </td>
                              <td
                                style={{ cursor: "pointer" }}
                                onMouseEnter={() =>
                                  handleMouseEnterAddress(user)
                                }
                                onMouseLeave={handleMouseLeaveAddress}
                              >
                                Hover for Address
                                {hoveredUserIdAddress === user.id && (
                                  <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                    className="address-container"
                                  >
                                    <div className="mask d-flex align-items-center h-100">
                                      <div className="container">
                                        <div className="row justify-content-center">
                                          <div className="col-12">
                                            <div
                                              className="card mask-custom"
                                              style={{
                                                backgroundColor: "black",
                                              }}
                                            >
                                              <div className="card-body ">
                                                <div className="table-responsive">
                                                  <table className="table table-borderless text-white mb-0">
                                                    <tbody>
                                                      <tr>
                                                        <th scope="row">
                                                          City:
                                                        </th>
                                                        <td>
                                                          {user.address.city}
                                                        </td>
                                                      </tr>
                                                      <tr>
                                                        <th scope="row">
                                                          Zip:
                                                        </th>
                                                        <td>
                                                          {user.address.zipcode}
                                                        </td>
                                                      </tr>
                                                      <tr>
                                                        <th scope="row">
                                                          Street:
                                                        </th>
                                                        <td>
                                                          {user.address.street}
                                                        </td>
                                                      </tr>
                                                      <tr>
                                                        <th scope="row">
                                                          Suite:
                                                        </th>
                                                        <td>
                                                          {user.address.suite}
                                                        </td>
                                                      </tr>
                                                      <tr>
                                                        <th scope="row">
                                                          Geo:
                                                        </th>
                                                        <td>Longitude:</td>
                                                        <td>
                                                          {user.address.geo.lng}
                                                        </td>
                                                      </tr>
                                                      <tr>
                                                        <th scope="row"></th>
                                                        <td>Latitute:</td>
                                                        <td>
                                                          {user.address.geo.lat}
                                                        </td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </motion.div>
                                )}
                              </td>
                              <td
                                style={{ cursor: "pointer" }}
                                onMouseEnter={() =>
                                  handleMouseEnterCompany(user)
                                }
                                onMouseLeave={handleMouseLeaveCompany}
                              >
                                {user.company.name}

                                {hoveredUserIdCompany === user.id && (
                                  <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                    className="address-container"
                                  >
                                    <div className="mask d-flex align-items-center h-100">
                                      <div className="container">
                                        <div className="row justify-content-center">
                                          <div className="col-12">
                                            <div
                                              className="card mask-custom"
                                              style={{
                                                backgroundColor: "black",
                                              }}
                                            >
                                              <div className="card-body ">
                                                <div className="table-responsive">
                                                  <table className="table table-borderless text-white mb-0">
                                                    <thead>
                                                      <tr>
                                                        <th scope="col">
                                                          {
                                                            user.company
                                                              .catchPhrase
                                                          }
                                                        </th>
                                                      </tr>
                                                    </thead>
                                                    <tbody>
                                                      <tr>
                                                        <td>
                                                          {user.company.bs}
                                                        </td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </motion.div>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Users;
