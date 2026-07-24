import { MdArrowOutward } from "react-icons/md";

interface Props {
  image: string;
  alt?: string;
  link?: string;
}

const WorkImage = (props: Props) => {
  const content = (
    <>
      {props.link && (
        <div className="work-link" aria-hidden="true">
          <MdArrowOutward />
        </div>
      )}
      <img
        src={props.image}
        alt={props.alt}
        loading="lazy"
        decoding="async"
        width="1200"
        height="675"
      />
    </>
  );

  return (
    <div className="work-image">
      {props.link ? (
        <a
          className="work-image-in"
          href={props.link}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="disable"
          aria-label={`Open ${props.alt}`}
        >
          {content}
        </a>
      ) : (
        <div className="work-image-in">{content}</div>
      )}
    </div>
  );
};

export default WorkImage;
