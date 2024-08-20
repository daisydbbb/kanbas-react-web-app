import * as client from "./client";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";

export default function Profile() {
  const [profile, setProfile] = useState<any>({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fetchProfile = async () => {
    try {
      const account = await client.profile();
      setProfile(account);
    } catch (err: any) {
      navigate("/Kanbas/Account/Signin");
    }
  };
  useEffect(() => {
    fetchProfile();
  }, []);

  const signout = async () => {
    await client.signout();
    dispatch(setCurrentUser(null));
    navigate("/Kanbas/Account/Signin");
  };

  const saveEdit = async () => {
    await client.update(profile);
    dispatch(setCurrentUser(profile));
    alert("Profile saved!");
  };

  return (
    <div className="wd-profile-screen">
      <h1>Profile</h1>
      {profile && (
        <div>
          <div
            className="row align-items-center "
            style={{ marginLeft: 10, marginBottom: 10 }}
          >
            Username:
            <input
              className="wd-username form-control w-25"
              value={profile.username}
              onChange={(e) =>
                setProfile({ ...profile, username: e.target.value })
              }
              style={{ marginLeft: 10 }}
            />
          </div>

          <div
            className="row align-items-center"
            style={{ marginLeft: 10, marginBottom: 10 }}
          >
            Password:
            <input
              className="wd-password form-control w-25"
              value={profile.password}
              onChange={(e) =>
                setProfile({ ...profile, password: e.target.value })
              }
              style={{ marginLeft: 10 }}
            />
          </div>

          <div
            className="row align-items-center"
            style={{ marginLeft: 10, marginBottom: 10 }}
          >
            First Name:
            <input
              className="wd-firstname form-control w-25"
              value={profile.firstName}
              onChange={(e) =>
                setProfile({ ...profile, firstName: e.target.value })
              }
              style={{ marginLeft: 10 }}
            />
          </div>

          <div
            className="row align-items-center"
            style={{ marginLeft: 10, marginBottom: 10 }}
          >
            Last Name:
            <input
              className="wd-lastname form-control w-25"
              value={profile.lastName}
              onChange={(e) =>
                setProfile({ ...profile, lastName: e.target.value })
              }
              style={{ marginLeft: 10 }}
            />
          </div>

          <div
            className="row align-items-center"
            style={{ marginLeft: 10, marginBottom: 10 }}
          >
            Date of Birth:
            <input
              className="wd-dob form-control w-25"
              value={profile.dob && profile.dob.split("T")[0]}
              onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
              type="date"
              style={{ marginLeft: 10 }}
            />
          </div>

          <div
            className="row align-items-center"
            style={{ marginLeft: 10, marginBottom: 10 }}
          >
            Email:
            <input
              className="wd-email form-control w-25"
              value={profile.email}
              onChange={(e) =>
                setProfile({ ...profile, email: e.target.value })
              }
              style={{ marginLeft: 10 }}
            />
          </div>

          <div
            className="row align-items-center"
            style={{ marginLeft: 10, marginBottom: 10 }}
          >
            Role:
            <input
              className="wd-role form-control w-25"
              value={profile.role}
              style={{ marginLeft: 10 }}
              readOnly
            />
          </div>
          <hr />
          <button
            onClick={saveEdit}
            className="wd-save-btn btn btn-primary me-2"
          >
            Save Edit
          </button>
          <button onClick={signout} className="wd-signout-btn btn btn-danger">
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
