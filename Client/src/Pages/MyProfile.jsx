import { LocateFixed } from "lucide-react";
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

const getInitials = (first, last) => {
  return (first?.[0] || "") + (last?.[0] || "");
};

const getAvatarUrl = (name, avatar) => {
  if (avatar) return avatar;
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=34d399&color=fff&size=128&rounded=true&bold=true`;
};

const tabButton =
  "px-6 py-2 rounded-t-2xl font-semibold text-base transition-all outline-none border-b-2 focus:outline-none select-none tracking-wide";
const tabButtonActive =
  "border-green-500 text-green-700 bg-[#e3fcef] shadow-[0_4px_0_0_#22c55e22]";
const tabButtonInactive =
  "border-transparent text-gray-500 bg-white hover:bg-[#f6fff7]";

const shimmer =
  "bg-gradient-to-r from-[#e6f3ec] to-[#f4fef7] bg-[length:200%_100%] animate-shimmer";
const glass =
  "backdrop-blur-[2.5px] bg-white/80 border border-[#e3e8ee] shadow-xl";

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
  const [animateTab, setAnimateTab] = useState("basic");
  // Location states for address tab
  const [locLoading, setLocLoading] = useState(false);
  const [locError, setLocError] = useState("");

  React.useEffect(() => {
    setAnimateTab("");
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
        setTimeout(() => setAvatarAnim(false), 400);
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

  // Use Geolocation API and reverse geocode to get the address
  const handleUseLocation = async (e) => {
    e.preventDefault();
    setLocError("");
    setLocLoading(true);
    if (!navigator.geolocation) {
      setLocError("Geolocation is not supported by your browser");
      setLocLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          if (data && data.address) {
            setForm((prev) => ({
              ...prev,
              address: {
                addressLine1: data.address.road || data.address.house_number || "",
                addressLine2: data.display_name || "",
                city: data.address.city || data.address.town || data.address.village || "",
                state: data.address.state || "",
                pinCode: data.address.postcode || ""
              }
            }));
          } else {
            setLocError("Unable to fetch address from location.");
          }
        } catch (err) {
          setLocError("Failed to get address from location.");
        }
        setLocLoading(false);
      },
      (error) => {
        setLocError("Failed to get your location.");
        setLocLoading(false);
      }
    );
  };

  const handleSave = (e) => {
    e.preventDefault();
    setUser(form);
    setEditMode(false);
    setEditTab("basic");
    setAvatarPreview(getAvatarUrl(`${form.firstName} ${form.lastName}`, form.avatar));
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#e3fcef] via-[#f6fbea] to-[#e6f3ec] flex flex-col items-center pt-10 px-2 relative overflow-x-hidden">
      <div className="absolute top-0 left-0 w-full h-96 pointer-events-none z-0">
        <div className="absolute left-[-80px] top-[-60px] w-96 h-96 rounded-full bg-green-100 opacity-50 blur-3xl animate-blob1" />
        <div className="absolute right-[-100px] top-12 w-80 h-80 rounded-full bg-green-200 opacity-30 blur-3xl animate-blob2" />
      </div>
      <div className={`relative z-10 ${glass} max-w-4xl w-full rounded-3xl px-4 sm:px-7 pt-8 pb-8 transition-all duration-500`}>
        {/* Display mode */}
        {!editMode ? (
          <>
            <div className="flex flex-col md:flex-row md:gap-6 gap-7 items-start md:items-stretch">
              {/* Basic Info */}
              <div className="flex-1 flex flex-col items-center md:items-start animate-profile-fade-in">
                <div
                  className={`w-32 h-32 rounded-full bg-gradient-to-br from-green-400 to-green-500 shadow-2xl flex items-center justify-center text-5xl font-extrabold text-white border-4 border-white transition-all duration-300 outline outline-4 outline-green-200/40 ${
                    avatarAnim ? "ring-4 ring-green-400 scale-110" : "ring-0 scale-100"
                  } hover:scale-105 hover:shadow-3xl hover:ring-2 hover:ring-green-300/70`}
                  style={{
                    boxShadow: "0 8px 32px 0 #22c55e44, 0 2.5px 9px 0 #34d39933"
                  }}
                >
                  {user.avatar
                    ? <img src={avatarPreview} alt="avatar" className="w-full h-full object-cover rounded-full" />
                    : getInitials(user.firstName, user.lastName)
                  }
                </div>
                <h2 className="mt-4 text-3xl font-extrabold text-green-800 text-center md:text-left tracking-tight drop-shadow">
                  {user.firstName} {user.lastName}
                </h2>
                <div className="mt-1 text-gray-800 text-center md:text-left text-lg font-medium flex flex-col gap-0.5">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 14v7m0 0h-2m2 0h2" /></svg>
                    {user.email}
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h2.28a2 2 0 011.7.99l.94 1.88a2 2 0 01-1.7 2.99H5a2 2 0 01-2-2zm0 4h4a2 2 0 002-2V5"></path></svg>
                    {user.phone}
                  </div>
                </div>
                <div className="mt-3 text-xs text-gray-400 font-light">
                  Member since <span className="font-medium text-green-600">{new Date(user.memberSince).toLocaleDateString()}</span>
                </div>
              </div>
              {/* Address Info */}
              <div className="flex-1 flex flex-col items-center md:items-start animate-profile-fade-in">
                <h3 className="text-2xl font-bold text-green-700 mb-2 text-center md:text-left tracking-tight">Address</h3>
                <div className={`mb-3 w-full rounded-3xl px-8 py-5 ${shimmer} border-l-4 border-green-200 shadow-md text-green-900 text-base`}
                  style={{ minHeight: 128, maxWidth: 480, boxShadow: "0 2px 12px 0 #bcf1d655" }}>
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
              className="mt-12 w-full bg-gradient-to-tr from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 rounded-2xl font-bold transition text-xl shadow-xl tracking-wide animate-profile-fade-in hover:scale-[1.025] active:scale-95"
              onClick={handleEditClick}
              style={{ letterSpacing: ".01em" }}
            >
              Edit Profile
            </button>
          </>
        ) : (
          // Edit mode
          <>
            <div className="flex items-center gap-2 mb-5 justify-between">
              <div className="flex gap-1 bg-[#e7f9ef]/50 px-1.5 rounded-2xl border border-green-100">
                <button
                  className={`${tabButton} ${editTab === "basic" ? tabButtonActive : tabButtonInactive}`}
                  type="button"
                  onClick={() => setEditTab("basic")}
                  tabIndex={0}
                  style={{ minWidth: 140, fontSize: "17px" }}
                >
                  Basic Information
                </button>
                <button
                  className={`${tabButton} ${editTab === "address" ? tabButtonActive : tabButtonInactive}`}
                  type="button"
                  onClick={() => setEditTab("address")}
                  tabIndex={0}
                  style={{ minWidth: 120, fontSize: "17px" }}
                >
                  Address
                </button>
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  form="profile-edit-form"
                  className="bg-gradient-to-tr from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-2 px-8 rounded-2xl font-bold text-base shadow-lg transition-all duration-200 focus:outline-none active:scale-95"
                  tabIndex={0}
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  className="bg-white/70 hover:bg-[#f3f6fa] text-gray-800 py-2 px-8 rounded-2xl font-bold text-base shadow border border-[#dbeafe] transition-all duration-200 focus:outline-none active:scale-95"
                  onClick={handleCancel}
                  tabIndex={0}
                >
                  Cancel
                </button>
              </div>
            </div>
            <form id="profile-edit-form" onSubmit={handleSave} autoComplete="off">
              <div className="flex flex-col gap-0 w-full">
                {/* Animate section in with fade/slide */}
                {editTab === "basic" && (
                  <div className="animate-slide-fade-down-modern bg-[#f6fff7]/90 rounded-3xl border border-[#e3e8ee] p-8 shadow-lg">
                    <h2 className="text-xl font-bold text-green-700 mb-3 tracking-tight flex items-center gap-2">
                      Basic Information
                    </h2>
                    <div className="flex flex-col items-center mb-3 pt-2">
                      <div className="relative mb-3 group">
                        <div
                          className={`w-24 h-24 rounded-full bg-gradient-to-br from-green-300 to-green-500 shadow-xl flex items-center justify-center text-4xl font-bold text-white border-4 border-white transition-all duration-300 ${
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
                          className="absolute left-1/2 -translate-x-1/2 -bottom-0 bg-white hover:bg-green-50 text-green-600 p-2 rounded-full cursor-pointer shadow-lg border-2 border-green-200 transition-all duration-200 flex items-center group-hover:scale-110"
                          tabIndex={-1}
                          style={{
                            minWidth: 38,
                            minHeight: 38,
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                      <div>
                        <label className="block text-xs font-bold text-gray-500 tracking-wide mb-1 uppercase">First Name</label>
                        <input
                          type="text"
                          name="firstName"
                          value={form.firstName}
                          onChange={handleChange}
                          required
                          className="w-full bg-white border border-[#e3e8ee] rounded-lg py-2 px-3 text-base font-medium focus:outline-none focus:ring-2 focus:ring-green-200 transition-all"
                          style={{ fontSize: "16px" }}
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
                          style={{ fontSize: "16px" }}
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
                          style={{ fontSize: "16px" }}
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
                          style={{ fontSize: "16px" }}
                        />
                      </div>
                    </div>
                    <div className="mt-5 text-xs text-gray-400 text-center select-none">
                      Member since <span className="text-green-600 font-semibold">{new Date(user.memberSince).toLocaleDateString()}</span>
                    </div>
                  </div>
                )}
                {editTab === "address" && (
                  <div className="animate-slide-fade-down-modern bg-[#fafffb]/90 rounded-3xl border border-[#e3e8ee] p-8 shadow-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h2 className="text-xl font-bold text-green-700 tracking-tight flex items-center gap-2">
                        Address
                      </h2>
                      <button
                        className="flex items-center gap-1 px-4 py-2 bg-green-100 hover:bg-green-200 text-green-800 font-semibold rounded-lg shadow transition whitespace-nowrap disabled:opacity-60"
                        onClick={handleUseLocation}
                        type="button"
                        disabled={locLoading}
                        style={{ fontSize: "15px" }}
                      >
                        {/* <svg className="w-4 h-4 fill-green-600" viewBox="0 0 20 20">
                          <circle cx="10" cy="10" r="8" fill="#3cd278" />
                          <path d="M10 6.5V10L12 12" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg> */}
                        <LocateFixed className="w-5 h-5" />
                        {locLoading ? "Locating..." : "Use My Location"}
                      </button>
                    </div>
                    {locError && (
                      <div className="text-xs text-red-500 mb-2">{locError}</div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
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
                          style={{ fontSize: "16px" }}
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
                          style={{ fontSize: "16px" }}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 tracking-wide mb-1 uppercase">City</label>
                        <input
                          type="text"
                          name="city"
                          value={form.address.city}
                          onChange={handleAddressChange}
                          required
                          placeholder="Enter city"
                          className="w-full bg-white border border-[#e3e8ee] rounded-lg py-2 px-3 text-base focus:outline-none focus:ring-2 focus:ring-green-200 transition-all placeholder:text-green-400"
                          style={{ fontSize: "16px" }}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 tracking-wide mb-1 uppercase">State</label>
                        <select
                          name="state"
                          value={form.address.state}
                          onChange={handleAddressChange}
                          required
                          className="w-full bg-white border border-[#e3e8ee] rounded-lg py-2 px-2 text-base focus:outline-none focus:ring-2 focus:ring-green-200 transition-all"
                          style={{ fontSize: "16px" }}
                        >
                          {states.map((st) => (
                            <option key={st} value={st}>
                              {st}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 tracking-wide mb-1 uppercase">Pin Code</label>
                        <input
                          type="text"
                          name="pinCode"
                          value={form.address.pinCode}
                          onChange={handleAddressChange}
                          required
                          placeholder="6-digit PIN code"
                          className="w-full bg-white border border-[#e3e8ee] rounded-lg py-2 px-3 text-base focus:outline-none focus:ring-2 focus:ring-green-200 transition-all placeholder:text-green-400"
                          style={{ fontSize: "16px" }}
                        />
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
        @keyframes slide-fade-down-modern {
          from { opacity: 0; transform: translateY(-40px) scale(0.98);}
          to { opacity: 1; transform: translateY(0) scale(1);}
        }
        .animate-slide-fade-down-modern {
          animation: slide-fade-down-modern 0.55s cubic-bezier(.65,-0.12,.23,1.12);
        }
        @keyframes profile-fade-in {
          from { opacity: 0; transform: translateY(60px) scale(0.98);}
          to { opacity: 1; transform: translateY(0) scale(1);}
        }
        .animate-profile-fade-in {
          animation: profile-fade-in 0.8s cubic-bezier(.65,-0.12,.23,1.12);
        }
        @keyframes shimmer {
          0% { background-position: -200% 0;}
          100% { background-position: 200% 0;}
        }
        .animate-shimmer {
          animation: shimmer 2.4s linear infinite;
        }
        @keyframes blob1 {
          0%,100% { transform: scale(1.0) translateY(0);}
          40% { transform: scale(1.12) translateY(20px);}
          70% { transform: scale(0.98) translateY(-10px);}
        }
        .animate-blob1 { animation: blob1 16s infinite linear; }
        @keyframes blob2 {
          0%,100% { transform: scale(1.0) translateY(0);}
          50% { transform: scale(1.07) translateY(-16px);}
        }
        .animate-blob2 { animation: blob2 13s infinite linear; }
      `}</style>
    </div>
  );
};

export default MyProfile;