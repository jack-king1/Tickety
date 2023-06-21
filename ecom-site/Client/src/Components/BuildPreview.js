import React, { useState, useEffect, useRef } from "react";
import { fabric } from "fabric";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
function BuildPreview({ tableData, activeBuildOption }) {
  const canvasRef = useRef(null);
  let canvas = new fabric.Canvas();
  const [previewImages, setPreviewImages] = useState([]);

  const CreateNewCanvas = () => {
    console.log("creating new canvas!");
    canvas = new fabric.Canvas(canvasRef.current);
    // Initialize Fabric.js canvas on component mount
    canvas.setDimensions({ width: 484, height: 204 });
    canvas.setBackgroundColor("black");
    canvas.preserveObjectStacking = true;
    //init canvas with correct amount of text for amount of columns.

    canvas.loadFromJSON(JSON.parse(activeBuildOption.buildDesign));
  };

  const GeneratePreviewImages = () => {
    //loop through each object on canvas
    let objects = canvas.getObjects();
    let fontStates = activeBuildOption.buildFontStates;
    let textAlignStates = activeBuildOption.textAlignStates;
    console.log("PREVIEW CANVAS OBJECTS: ", objects);

    for (let i = 0; i < activeBuildOption.buildData.length; i++) {
      if (i <= 0) {
        continue;
      }
      for (let k = 0; k < activeBuildOption.buildData[i].length; k++) {
        objects[k].set("text", activeBuildOption.buildData[i][k]);
        objects[k].set("fontFamily", fontStates[k]);
        // objects[k].set("textAlign", textAlignStates[k]);
      }
      console.log("ACTIVE FONT STATES: ", fontStates);
      //save canvas image.
      SaveToPNG();
    }
    canvas.renderAll();
    //canvas.remove();
  };

  const SaveToPNG = () => {
    var imageElement = new Image();
    imageElement.src = canvas.toDataURL({
      format: "png",
      multiplier: 3, // Increase the multiplier to get higher resolution images (optional)
    });
    setPreviewImages((previewImages) => [...previewImages, imageElement.src]);
  };

  useEffect(() => {
    CreateNewCanvas();
    GeneratePreviewImages();
  }, []);

  useEffect(() => {
    console.log("Images:", previewImages);
  }, [previewImages]);

  const RenderImages = () => {
    return (
      <div className="container ">
        <div className="row h-100">
          {previewImages.map((val, index) => (
            <div key={index} className="col-md-4  mb-2">
              <img className="img-fluid rounded-2" alt="not found" src={val} />
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="h-100 maxheight">
      <div>
        <div className="canvascontainer d-flex justify-content-center container h-100 mt-4">
          <canvas hidden className="position-float rounded rounded-2"></canvas>
          {RenderImages()}
        </div>
      </div>
    </div>
  );
}

export default BuildPreview;
