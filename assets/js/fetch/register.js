document
  .getElementById("registerButton")
  .addEventListener("click", async function () {
    const form = document.getElementById("registerForm");
    const formData = new FormData(form);

    // Membuat objek data yang akan dikirim ke server
    const data = {
      fullname: formData.get("name"),
      username: formData.get("username"),
      password: formData.get("password"),
      phone_number: formData.get("phone_number"),
    };

    console.log("Data to send:", JSON.stringify(data, null, 2)); // Debugging data sebelum dikirim

    // Tentukan URL backend
    const isLocalhost = window.location.origin === "http://127.0.0.1:5500";
    const BACKEND_URL = isLocalhost
      ? "http://127.0.0.1:8080/users/register" // URL backend untuk localhost
      : "https://bp-tubes-c48fa88ca6a5.herokuapp.com/api/users/register"; // URL backend untuk production

    try {
      // Kirim permintaan ke backend
      const response = await fetch(BACKEND_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // Menangani respons server
      if (response.ok) {
        const result = await response.json();
        alert(result.message); // Tampilkan pesan sukses
        window.location.href = "login.html"; // Redirect ke halaman login
      } else {
        const error = await response.json();
        console.error("Server Error:", error); // Log error dari server
        alert(`Error: ${error.message}`); // Tampilkan pesan error
      }
    } catch (error) {
      console.error("Error:", error); // Log error jika permintaan gagal
      alert("An error occurred while registering."); // Tampilkan pesan error
    }
  });
