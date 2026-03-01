"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const ADMIN_EMAIL = "juice.wrld999dead@gmail.com";

  // Form State to hold the clothes data
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [statusMsg, setStatusMsg] = useState("");

  // Loading Screen
  if (status === "loading") {
    return <div className="min-h-screen bg-black text-white flex items-center justify-center font-black tracking-widest uppercase">LOADING...</div>;
  }

  // The Bouncer
  if (!session || session.user?.email !== ADMIN_EMAIL) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center text-center px-4">
        <h1 className="text-3xl font-black uppercase tracking-widest text-red-600 border-2 border-red-600 p-8">
          ACCESS DENIED // 7H TEAM ONLY
        </h1>
      </div>
    );
  }

  // Handle Button Click
// Handle Button Click & Database Upload
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMsg("UPLOADING TO MAINFRAME...");

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, description, price, image }),
      });

      if (res.ok) {
        setStatusMsg("DROP UPLOADED SUCCESSFULLY! 🔥");
        // Wipe the form clean for the next item
        setName("");
        setDescription("");
        setPrice("");
        setImage("");
      } else {
        setStatusMsg("UPLOAD FAILED. CHECK TERMINAL.");
      }
    } catch (error) {
      setStatusMsg("SYSTEM ERROR. COULD NOT CONNECT.");
    }
  };

  return (
    <main className="min-h-screen bg-black text-white px-4 py-24 selection:bg-red-600 selection:text-white">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 border-b-2 border-white pb-4">
          7H Command Center
        </h1>
        <p className="text-zinc-400 font-bold tracking-widest mb-12 uppercase text-sm md:text-base">
          Authentication: <span className="text-green-500">VERIFIED</span> // Ready to drop.
        </p>

        {/* Upload Form Box */}
        <div className="border-2 border-white p-6 md:p-10 bg-zinc-950">
          <h2 className="text-2xl font-black uppercase tracking-widest mb-8 text-red-600">
            [ Upload New Item ]
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Product Name */}
            <div>
              <label className="block text-sm font-bold tracking-widest uppercase mb-2">Item Name</label>
              <input 
                type="text" 
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-black border-2 border-zinc-800 p-4 text-white focus:border-white focus:outline-none transition-colors"
                placeholder="e.g. 7H HEAVYWEIGHT HOODIE"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-bold tracking-widest uppercase mb-2">Description</label>
              <textarea 
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-black border-2 border-zinc-800 p-4 text-white focus:border-white focus:outline-none transition-colors h-32 resize-none"
                placeholder="e.g. 100% French Terry Cotton. Boxy fit. Distressed details."
              />
            </div>

            {/* Price and Image Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold tracking-widest uppercase mb-2">Price ($)</label>
                <input 
                  type="number" 
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full bg-black border-2 border-zinc-800 p-4 text-white focus:border-white focus:outline-none transition-colors"
                  placeholder="e.g. 85"
                />
              </div>
              <div>
                <label className="block text-sm font-bold tracking-widest uppercase mb-2">Image URL</label>
                <input 
                  type="url" 
                  required
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full bg-black border-2 border-zinc-800 p-4 text-white focus:border-white focus:outline-none transition-colors"
                  placeholder="e.g. https://imgur.com/your-image.png"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="w-full bg-white text-black font-black uppercase tracking-widest p-5 hover:bg-red-600 hover:text-white transition-colors duration-200 mt-8"
            >
              Publish to Store
            </button>

            {/* Status Message */}
            {statusMsg && (
              <p className="text-center font-bold tracking-widest uppercase mt-6 text-yellow-500">
                {statusMsg}
              </p>
            )}
            
          </form>
        </div>
      </div>
    </main>
  );
}