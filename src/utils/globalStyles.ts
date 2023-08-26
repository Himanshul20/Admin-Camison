import { createGlobalStyle } from "styled-components";
export const TableStyles = createGlobalStyle`/* Please ❤ this if you like it! 😊 */

//SCSS Variables:
$bg-color: #f2f6f9;
$active-color: #25be64;
$inactive-color: #dadde4;
$new-color: #febf02;
$text-color: #141a4e;
$table-bg-color: #fefefe;
$table-head-bg-color: #e1e8f2;
$table-border-color: #edeef2;
$hover-bg-color: #fb4f83;
$hover-text-color: #ffffff;

//Responsive Breakpoint SCSS Mixin:

//xxs
@mixin mobile-xxs {
	@media (max-width: 400px) {
		@content;
	}
}

//min-sm
@mixin min-tablet {
	@media (min-width: 768px) {
		@content;
	}
}

//md
@mixin desktop {
	@media (max-width: 991px) {
		@content;
	}
}

//sm to md
@mixin tablet-to-desktop {
	@media (min-width: 768px) and (max-width: 991px) {
		@content;
	}
}

/* Googles Font Link */
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap");

/* Reset Style */
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

html {
	font-size: 10px;
}

body {
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 100vh;
	font-family: "Poppins", sans-serif;
	color: $text-color;
	background-color: $bg-color;
	font-size: 1.6rem;
}

/* Page Wrapper/Container Style */
.container {
	width: 100%;
	max-width: 1140px;
	margin: 0 auto;
	padding: 0 15px;
}

/* Responsive Table Style */
.responsive-table {
	background-color: $table-bg-color;
	border-collapse: collapse;
	border-radius: 10px;
	box-shadow: 0 0 10px rgba($color: #000000, $alpha: 0.02);
	width: 100%;
	margin: 2rem 0;
	overflow: hidden;

	&__row {
		display: grid;
		border-bottom: 1px solid $table-border-color;
		padding: 0 1.5rem;

		@include min-tablet {
			grid-template-columns: 2fr 1fr 2fr 2fr 1fr;
		}

		@include tablet-to-desktop {
			grid-template-columns: 1fr 2fr 1fr;
		}

		th,
		td {
			padding: 1rem;
		}
	}

	&__head {
		background-color: $table-head-bg-color;

		@include desktop {
			display: none;
		}

		&__title {
			display: flex;
			align-items: center;
			font-weight: 500;
			text-transform: capitalize;
		}
	}

	&__body {
		.responsive-table__row {
			transition: 0.1s linear;
			transition-property: color, background;

			&:last-child {
				border-bottom: none;
			}

			&:hover {
				color: $hover-text-color;
				background-color: $hover-bg-color;
			}
		}

		&__text {
			display: flex;
			flex-wrap: wrap;
			align-items: center;

			&::before {
				margin-right: 1rem;
				font-weight: 600;
				text-transform: capitalize;
			}

			@include desktop {
				&::before {
					content: attr(data-title) " :";
				}
			}

			@include mobile-xxs {
				&::before {
					width: 100%;
					margin-bottom: 1rem;
				}
			}

			&--name {
				font-weight: 600;

				@include min-tablet {
					&::before {
						display: none;
					}
				}

				@include tablet-to-desktop {
					grid-column: 1 / 2;
					flex-direction: column;
				}
			}

			&--status,
			&--types,
			&--update {
				@include tablet-to-desktop {
					grid-column: 2/ 3;
				}
			}

			&--country {
				@include tablet-to-desktop {
					grid-column: 3/ -1;
				}
			}

			&--name,
			&--country {
				@include tablet-to-desktop {
					grid-row: 2;
				}
			}
		}
	}
}

/* SVG Up Arrow Style */
.up-arrow {
	height: 100%;
	max-height: 1.8rem;
	margin-left: 1rem;
}

/* SVG User Icon Style */
.user-icon {
	width: 100%;
	max-width: 4rem;
	height: auto;
	margin-right: 1rem;
}

/* Status Indicator Style */
.status-indicator {
	display: inline-block;
	width: 1.8rem;
	height: 1.8rem;
	border-radius: 50%;
	background: #222222;
	margin-right: 0.5rem;

	&--active {
		background: $active-color;
	}

	&--inactive {
		background: $inactive-color;
	}

	&--new {
		background: $new-color;
	}
}`;

export const GlobalStyles = createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;
    font-size: 14px;
    background: ${({ theme }: any) => theme.colors.body.default};
    color: ${({ theme }: any) => theme.colors.body.text};
    transition: all 0.50s linear;
    font-family: Open Sans, Roboto, -apple-system, BlinkMacSystemFont, Segoe UI,
    Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
    sans-serif;
    line-height: 1.5;
  }

  html {
    font-size: 16px;
  }

  * {
    box-sizing: border-box;
  }
  a {
    text-decoration: none;
    color: ${({ theme }: any) => theme.colors.body.text};
  }
  .cursor-pointer {
    cursor: pointer;
  }

#nprogress {
  pointer-events: none;
}

#nprogress .bar {
  background: ${({ theme }: any) => theme.colors.primary.main};

  position: fixed;
  z-index: 1031;
  top: 0;
  left: 0;

  width: 100%;
  height: 3px;
  border-radius: 0px 4px 4px 0px;
  overflow: hidden;
}

/* Fancy blur effect */
#nprogress .peg {
  display: block;
  position: absolute;
  right: 0px;
  width: 100px;
  height: 100%;
  box-shadow: 0 0 10px ${({ theme }: any) =>
    theme.colors.primary.main}, 0 0 5px ${({ theme }: any) =>
  theme.colors.primary.main};
  opacity: 1.0;

  -webkit-transform: rotate(3deg) translate(0px, -4px);
      -ms-transform: rotate(3deg) translate(0px, -4px);
          transform: rotate(3deg) translate(0px, -4px);
}

/* Remove these to get rid of the spinner */
#nprogress .spinner {
  display: block;
  position: fixed;
  z-index: 1031;
  top: 15px;
  right: 15px;
}

#nprogress .spinner-icon {
  width: 18px;
  height: 18px;
  box-sizing: border-box;

  border: solid 2px transparent;
  border-top-color: ${({ theme }: any) => theme.colors.primary.main};
  border-left-color: ${({ theme }: any) => theme.colors.primary.main};
  border-radius: 50%;

  -webkit-animation: nprogress-spinner 400ms linear infinite;
          animation: nprogress-spinner 400ms linear infinite;
}

.nprogress-custom-parent {
  overflow: hidden;
  position: relative;
}

.nprogress-custom-parent #nprogress .spinner,
.nprogress-custom-parent #nprogress .bar {
  position: absolute;
}

@-webkit-keyframes nprogress-spinner {
  0%   { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}
@keyframes nprogress-spinner {
  0%   { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;
