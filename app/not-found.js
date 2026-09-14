export default function NotFound() {
  return (
    <main style={{minHeight:'100vh',display:'grid',placeItems:'center',padding:'32px'}}>
      <div style={{maxWidth:720,textAlign:'center'}}>
        <div className="kicker">404 • PAGE NOT FOUND</div>
        <h1>এই পেজটি পাওয়া যায়নি</h1>
        <p>লিংকটি পুরোনো হতে পারে অথবা পেজটি সরানো হয়েছে।</p>
        <a className="btn primary" href="/">হোমপেজে ফিরুন →</a>
      </div>
    </main>
  );
}
