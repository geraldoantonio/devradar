import React, { useState } from 'react';

// import { Container } from './styles';

export default function FormComponent(props) {

  const [latitude, setLatitude] = useState(props.latitude)
  const [longitude, setLongitude] = useState(props.longitude)

  console.log(latitude, longitude)

  return (
    <>
      <strong>Cadastrar</strong>
      <form>
        <div className="input-block">
          <label htmlFor="github_username">Usuário do GitHub</label>
          <input type="text" name="github_username" id="github_username" required />
        </div>

        <div className="input-block">
          <label htmlFor="techs">Tecnologias</label>
          <input type="text" name="techs" id="techs" required />
        </div>

        <div className="input-group">

          <div className="input-block">
            <label htmlFor="latitude">Latitude</label>
            <input
              type="number"
              name="latitude"
              id="latitude"
              required
              value={latitude}
              onChange={e => setLatitude(e.target.value)}
            />
          </div>

          <div className="input-block">
            <label htmlFor="longitude">Longitude</label>
            <input
              type="number"
              name="longitude"
              id="longitude"
              required
              value={longitude}
              onChange={e => setLongitude(e.target.value)}
            />
          </div>
        </div>

        <button type="submit">Salvar</button>

      </form>
    </>
  );
}
