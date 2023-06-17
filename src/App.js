import React, { useState } from 'react';
import { Stage, Layer, Circle, Line, Image as KonvaImage } from 'react-konva';
import useImage from 'use-image';
import skullXray from './assets/skull-xray.jpg'
import _ from 'lodash';
import data from './data/coordinates.json';
import './App.css'

const originalImageWidth = 2688; 
const originalImageHeight = 2232;
const displayedImageWidth = 800;
const displayedImageHeight = 800;

const scaleX = displayedImageWidth / originalImageWidth;
const scaleY = displayedImageHeight / originalImageHeight;

const App = () => {
  const [image, status] = useImage(skullXray);  // replace with your image path
  console.log(status)
  const [teacherPoints, setTeacherPoints] = useState([]);
  const [studentPoints, setStudentPoints] = useState([]);
  const [showStudentSection, setShowStudentSection] = useState(false);
  const [showComparison, setShowComparison] = useState(false);

  const [selectedPointLabels, setSelectedPointLabels] = useState([]);

const handleAddPoint = (label) => {
  const shape = data.shapes.find((shape) => shape.label === label);
  const originalCoordinates = shape.points[0];
  const displayedCoordinates = originalCoordinates.map((coordinate, index) => {
    return index === 0 ? coordinate * scaleX : coordinate * scaleY;
  });
  const newTeacherPoints = [...teacherPoints, { label, coordinates: displayedCoordinates }];
  const newSelectedPointLabels = [...selectedPointLabels, label];
  setTeacherPoints(newTeacherPoints);
  setSelectedPointLabels(newSelectedPointLabels);
};


  const handleStudentPoint = (event) => {
    if (showStudentSection && !showComparison) {
      const newStudentPoints = [...studentPoints, [event.evt.layerX, event.evt.layerY]];
      setStudentPoints(newStudentPoints);
    }
  };

  const handleSubmitTeacher = () => {
    setShowStudentSection(true);
  };

  const handleStudentUndo = () => {
    const updatedStudentPoints = [...studentPoints];
    updatedStudentPoints.pop(); // Remove the last point
    setStudentPoints(updatedStudentPoints);
  };

  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmitStudent = () => {
    if (studentPoints.length === teacherPoints.length) {
      setShowComparison(true);
    } else {
      // Student has plotted less/more points than required
      setErrorMessage('Please plot the same number of points as given above');
    }
  };
  

  const calculateDeltas = () => {
    const correctPoints = teacherPoints.map(point => point.coordinates);
    const deltas = studentPoints.map((point, i) => {
      const correctPoint = correctPoints[i];
      const delta = Math.sqrt(_.sum(_.map(_.zip(point, correctPoint), ([a, b]) => (a - b) ** 2)));
      return delta;
    });
    return deltas;
  };

  return (
    <div>
      {!showStudentSection && !showComparison && (
        <div>
          <div className='teacher__select__container'>
            <select className="teacher__select" onChange={(e) => handleAddPoint(e.target.value)}>
              <option className="select__title" value="">Select a point</option>
              {data.shapes.map((shape, index) => (
                <option key={index} value={shape.label}>
                  {shape.label}
                </option>
              ))}
            </select>
          </div>
          <Stage className="stage" width={displayedImageWidth} height={displayedImageHeight} onClick={handleStudentPoint}>
            <Layer>
              <KonvaImage image={image} width={displayedImageWidth} height={displayedImageHeight} />
              {teacherPoints.map((point, i) => (
                <Circle
                  key={i}
                  x={point.coordinates[0]}
                  y={point.coordinates[1]}
                  radius={5}
                  fill='red'
                />
              ))}
              <Line points={teacherPoints.flatMap(point => point.coordinates)} stroke="red" />
            </Layer>
          </Stage>
          <div className='button__container'>
            <button className='button' onClick={handleSubmitTeacher}>Submit</button>
          </div>        
        </div>
      )}

      {showStudentSection && !showComparison && (
        <div className='student__section'>
          <h3 className='student__title'>Student Section</h3>
          <p className='student__task'>Plot the following points:</p>
          <div className='student-points__container'>
            {selectedPointLabels.reverse().map((label, i) => (
              <p key={i}>{label}</p>
            ))}
          </div>
          <Stage width={displayedImageWidth} height={displayedImageHeight} onClick={handleStudentPoint}>
            <Layer>
              <KonvaImage image={image} width={displayedImageWidth} height={displayedImageHeight} />
              {studentPoints.map((point, i) => (
                <Circle key={i} x={point[0]} y={point[1]} radius={5} fill="blue" />
              ))}
              {studentPoints.length >= 2 && <Line points={studentPoints.flat()} stroke="blue" />}
            </Layer>
          </Stage>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <div className='button__container'>
            <button className='button' onClick={handleStudentUndo}>Undo</button>
            <button className='button' onClick={handleSubmitStudent}>Submit</button>
          </div>
          
        </div>
      )}






{showComparison && (
  <div className='comparison__container'>
    <h3 className='comparison__title'>Comparison</h3>
    <div className='comparison__stages'>
      <div className='teacher__stage'>
        <h4>Teacher's Plot</h4>
        <Stage width={displayedImageWidth} height={displayedImageHeight}>
          <Layer>
            <KonvaImage image={image} width={displayedImageWidth} height={displayedImageHeight} />
            {teacherPoints.map((point, i) => (
              <Circle
                key={i}
                x={point.coordinates[0]}
                y={point.coordinates[1]}
                radius={5}
                fill='red'
              />
            ))}
            <Line points={teacherPoints.flatMap(point => point.coordinates)} stroke="red" />
          </Layer>
        </Stage>
      </div>

      <div className='student__stage'>
        <h4>Student's Plot</h4>
        <Stage width={displayedImageWidth} height={displayedImageHeight}>
          <Layer>
            <KonvaImage image={image} width={displayedImageWidth} height={displayedImageHeight} />
            {studentPoints.map((point, i) => (
              <Circle key={i} x={point[0]} y={point[1]} radius={5} fill="blue" />
            ))}
            {studentPoints.length >= 2 && <Line points={studentPoints.flat()} stroke="blue" />}
          </Layer>
        </Stage>
      </div>
    </div>

    <ul>
      {teacherPoints.map((point, i) => (
        <li key={i} className='comparison__delta'>
          {point.label}: Teacher's Point - ({point.coordinates[0]}, {point.coordinates[1]})
          <br />
          {point.label}: Student's Point - ({studentPoints[i][0]}, {studentPoints[i][1]})
          <br />
          <span className='delta'>Delta: {calculateDeltas()[i]}</span>
        </li>
      ))}
    </ul>
  </div>
)}

    </div>
  );
};

export default App;
