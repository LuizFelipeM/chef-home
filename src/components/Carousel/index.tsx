import React, { useEffect, useRef } from "react";
import { ReactAppOrParcel } from "single-spa-react";
import { mountParcel } from "../../Chef-home";


export const Carousel: React.FC = (props) => {
  const carouselRef = useRef(null)

  useEffect(() => {
    import('@Chef/carousel')
      .then((module: ReactAppOrParcel<{}>) => {
        mountParcel?.({ ...module },
          {
            domElement: carouselRef.current
          })
      })
  }, [])

  return (
    <div ref={carouselRef} className="container" />
  )
}