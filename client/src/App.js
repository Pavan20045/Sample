import './App.css'; 
import videoSrc from '../src/components/images/1.mp4';
import Errorroute from './components/class10-LocalApi/errorroute';
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Rootlayout from './components/class10-LocalApi/Rootlayout';
import CheckPlant from './components/class10-LocalApi/checkplant';
import AboutPlant from'./components/class10-LocalApi/aboutplant'
function App() {
  //browser router object
  let router=createBrowserRouter([
    {
      path:'',
      element:<Rootlayout/>,
      errorElement:<Errorroute/>,
      children:[
        { path: '', element: < CheckPlant/> },
        
        { path: 'plantinfo', element: < AboutPlant/> },

      ]
    }
   
  ])

 return (
    <div >
      {/* <h1  className='text-danger display-4 bg-warning' style={{margin:"auto",width:"500px"}}>Welcome to React</h1> */}

       {/* provide browser router object to application */}
       <video id="myVideo" autoPlay muted loop>
        <source src={videoSrc} type="video/mp4" />
      </video>

       <RouterProvider router={router}/>
      
      
    </div>
  );
}

export default App;
