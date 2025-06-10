import React, { useState, useRef } from "react";

const states = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat",
  "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh",
  "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
  "Uttarakhand", "West Bengal"
];

const initialUser = {
  firstName: "Srinjay",
  lastName: "Karfa",
  email: "srinjay@example.com",
  phone: "+91 98765 43210",
  avatar: "",
  memberSince: "2023-04-15",
  address: {
    addressLine1: "221B Baker Street",
    addressLine2: "Landmark: Near Regent Park",
    city: "Kolkata",
    state: "West Bengal",
    pinCode: "700035",
  }
};

const getInitials = (first, last) =>
  (first?.[0] || "") + (last?.[0] || "");

const getAvatarUrl = (name, avatar) => {
  if (avatar) return avatar;
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=34d399&color=fff&size=128`;
};

const tabButton =
  "px-5 py-1.5 rounded-t-lg font-bold text-base transition-all outline-none border-b-2 focus:outline-none select-none";
const tabButtonActive =
  "border-green-600 text-green-700 bg-[#f6fff7] shadow-[0_2px_0_0_#22c55e22]";
const tabButtonInactive =
  "border-transparent text-gray-500 bg-white hover:bg-[#f6fff7]";

const MyProfile = () => {
  const [user, setUser] = useState(initialUser);
  const [editMode, setEditMode] = useState(false);
  const [editTab, setEditTab] = useState("basic");
  const [form, setForm] = useState(initialUser);
  const [avatarPreview, setAvatarPreview] = useState(
    getAvatarUrl(`${initialUser.firstName} ${initialUser.lastName}`, initialUser.avatar)
  );
  const fileInputRef = useRef();
  const [avatarAnim, setAvatarAnim] = useState(false);

  // animation states
  const [animateTab, setAnimateTab] = useState("basic");

  React.useEffect(() => {
    setAnimateTab(""); // clear to trigger re-animation
    setTimeout(() => setAnimateTab(editTab), 10);
  }, [editTab]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setAvatarAnim(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({ ...prev, avatar: reader.result }));
        setAvatarPreview(reader.result);
        setTimeout(() => setAvatarAnim(false), 350);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditClick = () => {
    setForm(user);
    setAvatarPreview(getAvatarUrl(`${user.firstName} ${user.lastName}`, user.avatar));
    setEditTab("basic");
    setEditMode(true);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setForm(user);
    setEditMode(false);
    setEditTab("basic");
    setAvatarPreview(getAvatarUrl(`${user.firstName} ${user.lastName}`, user.avatar));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (
      (e.target.name === "firstName" || e.target.name === "lastName") &&
      !form.avatar
    ) {
      setAvatarPreview(
        getAvatarUrl(
          e.target.name === "firstName"
            ? `${e.target.value} ${form.lastName}`
            : `${form.firstName} ${e.target.value}`,
          ""
        )
      );
    }
  };

  const handleAddressChange = (e) => {
    setForm({
      ...form,
      address: { ...form.address, [e.target.name]: e.target.value }
    });
  };

  const handleUseLocation = (e) => {
    e.preventDefault();
    setForm({
      ...form,
      address: {
        addressLine1: "221B Baker Street",
        addressLine2: "Landmark: Near Regent Park",
        city: "Kolkata",
        state: "West Bengal",
        pinCode: "700035"
      }
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setUser(form);
    setEditMode(false);
    setEditTab("basic");
    setAvatarPreview(getAvatarUrl(`${form.firstName} ${form.lastName}`, form.avatar));
  };

  return (
    <div className="min-h-screen bg-[#f6fbea] flex flex-col items-center pt-8 px-2">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-2xl px-2 pt-5 pb-6 transition-all duration-500 border border-[#e3e8ee]">
        {/* Display mode */}
        {!editMode ? (
          <>
            <div className="flex flex-col md:flex-row md:gap-2 gap-3 items-start md:items-stretch">
              {/* Basic Info */}
              <div className="flex-1 flex flex-col items-center md:items-start animate-profile-fade-in">
                <div
                  className={`w-28 h-28 rounded-full bg-gradient-to-br from-green-400 to-green-500 shadow-xl flex items-center justify-center text-4xl font-bold text-white border-4 border-white transition-all duration-300 ${
                    avatarAnim ? "ring-4 ring-green-400 scale-110" : "ring-0 scale-100"
                  }`}
                  style={{
                    boxShadow: "0 4px 24px 0 #22c55e33, 0 1.5px 5px 0 #34d39933"
                  }}
                >
                  {user.avatar
                    ? <img src={avatarPreview} alt="avatar" className="w-full h-full object-cover rounded-full" />
                    : getInitials(user.firstName, user.lastName)
                  }
                </div>
                <h2 className="mt-3 text-2xl font-bold text-green-700 text-center md:text-left">
                  {user.firstName} {user.lastName}
                </h2>
                <div className="mt-1 text-gray-700 text-center md:text-left text-base font-normal">
                  <div>{user.email}</div>
                  <div>{user.phone}</div>
                </div>
                <div className="mt-2 text-sm text-gray-400 font-light">
                  Member since {new Date(user.memberSince).toLocaleDateString()}
                </div>
              </div>
              {/* Address Info */}
              <div className="flex-1 flex flex-col items-center md:items-start animate-profile-fade-in">
                <h3 className="text-2xl font-bold text-green-700 mb-2 text-center md:text-left">Address</h3>
                <div className="mb-3 w-full bg-[#f4fef7] rounded-2xl border border-[#bcf1d6] px-6 py-4 text-base text-green-900 shadow-sm"
                  style={{ minHeight: 115, maxWidth: 420 }}
                >
                  <span className="font-bold text-green-700 block mb-1">Current Address</span>
                  <div>{user.address.addressLine1}</div>
                  {user.address.addressLine2 && <div>{user.address.addressLine2}</div>}
                  <div>
                    {[user.address.city, user.address.state, user.address.pinCode]
                      .filter(Boolean)
                      .join(", ")}
                  </div>
                </div>
              </div>
            </div>
            <button
              className="mt-8 w-full bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-xl font-bold transition text-lg shadow-md tracking-wide animate-profile-fade-in"
              onClick={handleEditClick}
              style={{ letterSpacing: ".01em" }}
            >
              Edit Profile
            </button>
          </>
        ) : (
          // Edit mode
          <>
            <div className="flex items-center gap-2 mb-4 justify-between">
              <div className="flex gap-1">
                <button
                  className={`${tabButton} ${editTab === "basic" ? tabButtonActive : tabButtonInactive}`}
                  type="button"
                  onClick={() => setEditTab("basic")}
                  tabIndex={0}
                  style={{ minWidth: 120, fontSize: "16px" }}
                >
                  Basic Information
                </button>
                <button
                  className={`${tabButton} ${editTab === "address" ? tabButtonActive : tabButtonInactive}`}
                  type="button"
                  onClick={() => setEditTab("address")}
                  tabIndex={0}
                  style={{ minWidth: 100, fontSize: "16px" }}
                >
                  Address
                </button>
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  form="profile-edit-form"
                  className="bg-green-600 hover:bg-green-700 text-white py-1.5 px-7 rounded-xl font-bold text-base shadow transition-all duration-200 focus:outline-none active:scale-95"
                  tabIndex={0}
                  style={{ fontSize: "16px" }}
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  className="bg-[#f3f6fa] hover:bg-[#e5e8ef] text-gray-800 py-1.5 px-7 rounded-xl font-bold text-base shadow transition-all duration-200 focus:outline-none border border-[#dbeafe] active:scale-95"
                  onClick={handleCancel}
                  tabIndex={0}
                  style={{ fontSize: "16px" }}
                >
                  Cancel
                </button>
              </div>
            </div>
            <form id="profile-edit-form" onSubmit={handleSave}>
              <div className="flex flex-col gap-0 w-full">
                {/* Animate section in with fade/slide */}
                {editTab === "basic" && (
                  <div className="animate-slide-fade-down bg-[#fafcfc] rounded-2xl border border-[#e3e8ee] p-7 shadow-md">
                    <h2 className="text-xl font-bold text-green-700 mb-2 tracking-tight flex items-center gap-2">
                      Basic Information
                    </h2>
                    <div className="flex flex-col items-center mb-2 pt-2">
                      <div className="relative mb-3 group">
                        <div
                          className={`w-20 h-20 rounded-full bg-gradient-to-br from-green-300 to-green-500 shadow-xl flex items-center justify-center text-3xl font-bold text-white border-4 border-white transition-all duration-300 ${
                            avatarAnim
                              ? "ring-4 ring-green-400 scale-110"
                              : "ring-0 scale-100"
                          }`}
                        >
                          {form.avatar
                            ? <img src={avatarPreview} alt="avatar" className="w-full h-full object-cover rounded-full" />
                            : getInitials(form.firstName, form.lastName)
                          }
                        </div>
                        {/* Avatar change icon button */}
                        <button
                          type="button"
                          onClick={() => fileInputRef.current.click()}
                          className="absolute left-1/2 -translate-x-1/2 -bottom-1 bg-white hover:bg-green-50 text-green-600 p-1 rounded-full cursor-pointer shadow-lg border-2 border-green-200 transition-all duration-200 flex items-center group-hover:scale-110"
                          tabIndex={-1}
                          style={{
                            minWidth: 36,
                            minHeight: 36,
                            boxShadow: "0 2px 8px 0 #22c55e22"
                          }}
                          title="Change avatar"
                        >
                          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                            <circle cx="11" cy="11" r="9" fill="#22c55e"/>
                            <path
                              d="M7.29 15.29A1 1 0 0 1 8 15h6a1 1 0 0 1 .71.29l2-2A1 1 0 0 0 16.59 11H15V9.41A1 1 0 0 0 13.59 8l-2 2A1 1 0 0 0 11 11v1.59l-2 2ZM8 9.41V11H6.41l2-2H8Zm6 1.18V11h1.59l-2-2V10.59Z"
                              fill="#fff"
                            />
                          </svg>
                        </button>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          ref={fileInputRef}
                          onChange={handleAvatarChange}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-2 mt-1">
                      <div>
                        <label className="block text-xs font-bold text-gray-500 tracking-wide mb-1 uppercase">First Name</label>
                        <input
                          type="text"
                          name="firstName"
                          value={form.firstName}
                          onChange={handleChange}
                          required
                          className="w-full bg-white border border-[#e3e8ee] rounded-lg py-2 px-3 text-base font-medium focus:outline-none focus:ring-2 focus:ring-green-200 transition-all"
                          style={{ fontSize: "15px" }}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 tracking-wide mb-1 uppercase">Last Name</label>
                        <input
                          type="text"
                          name="lastName"
                          value={form.lastName}
                          onChange={handleChange}
                          required
                          className="w-full bg-white border border-[#e3e8ee] rounded-lg py-2 px-3 text-base font-medium focus:outline-none focus:ring-2 focus:ring-green-200 transition-all"
                          style={{ fontSize: "15px" }}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 tracking-wide mb-1 uppercase">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          required
                          className="w-full bg-white border border-[#e3e8ee] rounded-lg py-2 px-3 text-base font-medium focus:outline-none focus:ring-2 focus:ring-green-200 transition-all"
                          style={{ fontSize: "15px" }}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 tracking-wide mb-1 uppercase">Phone</label>
                        <input
                          type="text"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          required
                          className="w-full bg-white border border-[#e3e8ee] rounded-lg py-2 px-3 text-base font-medium focus:outline-none focus:ring-2 focus:ring-green-200 transition-all"
                          style={{ fontSize: "15px" }}
                        />
                      </div>
                    </div>
                    <div className="mt-4 text-xs text-gray-400 text-center select-none">
                      Member since {new Date(user.memberSince).toLocaleDateString()}
                    </div>
                  </div>
                )}
                {editTab === "address" && (
                  <div className="animate-slide-fade-down bg-[#fafcfc] rounded-2xl border border-[#e3e8ee] p-7 shadow-md">
                    <div className="flex items-center justify-between mb-2">
                      <h2 className="text-xl font-bold text-green-700 tracking-tight flex items-center gap-2">
                        Address
                      </h2>
                      <button
                        className="flex items-center gap-1 text-green-600 hover:text-green-700 font-semibold text-sm transition px-3 py-1 rounded-full bg-green-100 hover:bg-green-200"
                        onClick={handleUseLocation}
                        type="button"
                        style={{ fontSize: "14px" }}
                      >
                        <svg className="w-4 h-4 fill-green-600" viewBox="0 0 20 20">
                          <circle cx="10" cy="10" r="8" fill="#3cd278" />
                          <path d="M10 6.5V10L12 12" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Use My Location
                      </button>
                    </div>
                    <div className="grid grid-cols-1 gap-2 mt-2">
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 tracking-wide mb-1 uppercase">
                          Address Line 1
                        </label>
                        <input
                          type="text"
                          name="addressLine1"
                          value={form.address.addressLine1}
                          onChange={handleAddressChange}
                          required
                          placeholder="House/Flat number, Street, Locality"
                          className="w-full bg-white border border-[#e3e8ee] rounded-lg py-2 px-3 text-base focus:outline-none focus:ring-2 focus:ring-green-200 transition-all placeholder:text-green-400"
                          style={{ fontSize: "15px" }}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 tracking-wide mb-1 uppercase">
                          Address Line 2
                        </label>
                        <input
                          type="text"
                          name="addressLine2"
                          value={form.address.addressLine2}
                          onChange={handleAddressChange}
                          placeholder="Landmark, Area (optional)"
                          className="w-full bg-white border border-[#e3e8ee] rounded-lg py-2 px-3 text-base focus:outline-none focus:ring-2 focus:ring-green-200 transition-all placeholder:text-green-400"
                          style={{ fontSize: "15px" }}
                        />
                      </div>
                      <div className="flex gap-2">
                        <div className="flex-1">
                          <label className="block text-xs font-semibold text-gray-500 tracking-wide mb-1 uppercase">City</label>
                          <input
                            type="text"
                            name="city"
                            value={form.address.city}
                            onChange={handleAddressChange}
                            required
                            placeholder="Enter city"
                            className="w-full bg-white border border-[#e3e8ee] rounded-lg py-2 px-3 text-base focus:outline-none focus:ring-2 focus:ring-green-200 transition-all placeholder:text-green-400"
                            style={{ fontSize: "15px" }}
                          />
                        </div>
                        <div className="flex-1">
                          <label className="block text-xs font-semibold text-gray-500 tracking-wide mb-1 uppercase">State</label>
                          <select
                            name="state"
                            value={form.address.state}
                            onChange={handleAddressChange}
                            required
                            className="w-full bg-white border border-[#e3e8ee] rounded-lg py-2 px-2 text-base focus:outline-none focus:ring-2 focus:ring-green-200 transition-all"
                            style={{ fontSize: "15px" }}
                          >
                            {states.map((st) => (
                              <option key={st} value={st}>
                                {st}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="flex-1">
                          <label className="block text-xs font-semibold text-gray-500 tracking-wide mb-1 uppercase">Pin Code</label>
                          <input
                            type="text"
                            name="pinCode"
                            value={form.address.pinCode}
                            onChange={handleAddressChange}
                            required
                            placeholder="6-digit PIN code"
                            className="w-full bg-white border border-[#e3e8ee] rounded-lg py-2 px-3 text-base focus:outline-none focus:ring-2 focus:ring-green-200 transition-all placeholder:text-green-400"
                            style={{ fontSize: "15px" }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </form>
          </>
        )}
      </div>
      <style>{`
        @keyframes slide-fade-down {
          from { opacity: 0; transform: translateY(-30px);}
          to { opacity: 1; transform: translateY(0);}
        }
        @keyframes profile-fade-in {
          from { opacity: 0; transform: translateY(40px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .animate-slide-fade-down {
          animation: slide-fade-down 0.4s cubic-bezier(.65,-0.12,.23,1.12);
        }
        .animate-profile-fade-in {
          animation: profile-fade-in 0.7s cubic-bezier(.65,-0.12,.23,1.12);
        }
      `}</style>
    </div>
  );
};

export default MyProfile;