import Layout from '../components/MyLayout';
import Link from 'next/link';

const Sample = () => {
  return(
<div>

<h1>Aqui van los submenus por modulo</h1>
        <div>
          <ul className="nav nav-pills flex-column">
            <li className="nav-item">
              <a className="nav-link active" href="#">Active</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Dropdown</a>
              <div className="dropdown-menu" style="">
                <a className="dropdown-item" href="#">Action</a>
                <a className="dropdown-item" href="#">Another action</a>
                <a className="dropdown-item" href="#">Something else here</a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#">Separated link</a>
              </div>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Link</a>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled" href="#">Disabled</a>
            </li>
          </ul>
        </div>
      <div>
          <h2>Form Temporal Alta de Bienes</h2>
            <form>
                <fieldset>
                    <legend>Bien</legend>
                    <div className="form-group">
                        <label for="exampleSelect1">Selector Tipo</label>
                        <select className="form-control" id="exampleSelect1">
                            <option>Inversion</option>
                            <option>Herencia</option>
                            <option>Desarrollo</option>
                            <option>Hipotecario</option>
                        </select>
                    </div>
                </fieldset>
                <fieldset class="form-group">
    <legend>Checkboxes</legend>
    <div className="form-group">
      <div className="custom-control custom-switch">
        <input type="checkbox" className="custom-control-input" id="customSwitch1"/>
        <label className="custom-control-label" for="customSwitch1">Toggle this switch element</label>
      </div>
      <div className="custom-control custom-switch">
        <input type="checkbox" className="custom-control-input" disabled="true" id="customSwitch2"/>
        <label className="custom-control-label" for="customSwitch2">Disabled switch element</label>
      </div>
    </div>    
    </fieldset>
            </form>
            <div className="alert alert-dismissible alert-warning">
                <button type="button" className="close" data-dismiss="alert">&times;</button>
                <h4 className="alert-heading">Desplegar aqui datos de la consulta temporal</h4>
                <p className="mb-0">LOREM IPSUM</p>
            </div>
            <ul className="list-group">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    FISO 0
                    <span className="badge badge-primary badge-pill">Elementos Asigandos 5</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    FISO 1 
                    <span className="badge badge-primary badge-pill">Elementos Asigandos 10</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    FISO 3
                    <span className="badge badge-primary badge-pill">Elementos Asigandos 15</span>
                </li>
            </ul>
            <h2>Niveles de navegacion</h2>
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="#">Aplicaciones</a></li>
                <li className="breadcrumb-item"><a href="#">Inmuebles</a></li>
                <li className="breadcrumb-item"><a href="#">Desarrollo Inmobilirario</a></li>
                <li className="breadcrumb-item active">FISO 0</li>
            </ol>
      </div>
      </div>
 )}
 export default Sample