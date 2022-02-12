"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/orders/[orderId]";
exports.ids = ["pages/orders/[orderId]"];
exports.modules = {

/***/ "./hooks/fetchPayment.js":
/*!*******************************!*\
  !*** ./hooks/fetchPayment.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"fetchPayment\": () => (/* binding */ fetchPayment)\n/* harmony export */ });\nconst fetchPayment = async (order, currentUser)=>{\n    var myHeaders = new Headers();\n    myHeaders.append(\"Content-Type\", \"application/json\");\n    myHeaders.append(\"x-client-id\", process.env.CASHFREE_APPID);\n    myHeaders.append(\"x-client-secret\", process.env.CASHFREE_SECRET_KEY);\n    myHeaders.append(\"x-api-version\", \"2022-01-01\");\n    var raw = JSON.stringify({\n        order_amount: order.ticket.price,\n        order_currency: \"INR\",\n        customer_details: {\n            customer_id: order.userId,\n            customer_email: currentUser.email,\n            customer_phone: \"9908734801\"\n        },\n        order_meta: {\n            return_url: \"https://ticketing.dev?order_id={order_id}&order_token={order_token}\"\n        },\n        order_expiry_time: order.expiresAt\n    });\n    var requestOptions = {\n        method: \"POST\",\n        headers: myHeaders,\n        body: raw,\n        redirect: \"follow\"\n    };\n    try {\n        const res = await fetch(\"/api/pay\", requestOptions);\n        const data = await res.json();\n        return {\n            data\n        };\n    } catch (error) {\n        console.log(error);\n        return {\n            err: \"something went wrong\"\n        };\n    }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ob29rcy9mZXRjaFBheW1lbnQuanMuanMiLCJtYXBwaW5ncyI6Ijs7OztBQUFPLEtBQUssQ0FBQ0EsWUFBWSxVQUFVQyxLQUFLLEVBQUVDLFdBQVcsR0FBSyxDQUFDO0lBQ3pELEdBQUcsQ0FBQ0MsU0FBUyxHQUFHLEdBQUcsQ0FBQ0MsT0FBTztJQUMzQkQsU0FBUyxDQUFDRSxNQUFNLENBQUMsQ0FBYyxlQUFFLENBQWtCO0lBQ25ERixTQUFTLENBQUNFLE1BQU0sQ0FBQyxDQUFhLGNBQUVDLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDQyxjQUFjO0lBQzFETCxTQUFTLENBQUNFLE1BQU0sQ0FBQyxDQUFpQixrQkFBRUMsT0FBTyxDQUFDQyxHQUFHLENBQUNFLG1CQUFtQjtJQUNuRU4sU0FBUyxDQUFDRSxNQUFNLENBQUMsQ0FBZSxnQkFBRSxDQUFZO0lBRTlDLEdBQUcsQ0FBQ0ssR0FBRyxHQUFHQyxJQUFJLENBQUNDLFNBQVMsQ0FBQyxDQUFDO1FBQ3hCQyxZQUFZLEVBQUVaLEtBQUssQ0FBQ2EsTUFBTSxDQUFDQyxLQUFLO1FBQ2hDQyxjQUFjLEVBQUUsQ0FBSztRQUNyQkMsZ0JBQWdCLEVBQUUsQ0FBQztZQUNqQkMsV0FBVyxFQUFFakIsS0FBSyxDQUFDa0IsTUFBTTtZQUN6QkMsY0FBYyxFQUFFbEIsV0FBVyxDQUFDbUIsS0FBSztZQUNqQ0MsY0FBYyxFQUFFLENBQVk7UUFDOUIsQ0FBQztRQUNEQyxVQUFVLEVBQUUsQ0FBQztZQUNYQyxVQUFVLEVBQ1IsQ0FBcUU7UUFDekUsQ0FBQztRQUNEQyxpQkFBaUIsRUFBRXhCLEtBQUssQ0FBQ3lCLFNBQVM7SUFDcEMsQ0FBQztJQUVELEdBQUcsQ0FBQ0MsY0FBYyxHQUFHLENBQUM7UUFDcEJDLE1BQU0sRUFBRSxDQUFNO1FBQ2RDLE9BQU8sRUFBRTFCLFNBQVM7UUFDbEIyQixJQUFJLEVBQUVwQixHQUFHO1FBQ1RxQixRQUFRLEVBQUUsQ0FBUTtJQUNwQixDQUFDO0lBQ0QsR0FBRyxDQUFDLENBQUM7UUFDSCxLQUFLLENBQUNDLEdBQUcsR0FBRyxLQUFLLENBQUNDLEtBQUssQ0FBQyxDQUFVLFdBQUVOLGNBQWM7UUFDbEQsS0FBSyxDQUFDTyxJQUFJLEdBQUcsS0FBSyxDQUFDRixHQUFHLENBQUNHLElBQUk7UUFDM0IsTUFBTSxDQUFDLENBQUM7WUFBQ0QsSUFBSTtRQUFDLENBQUM7SUFDakIsQ0FBQyxDQUFDLEtBQUssRUFBRUUsS0FBSyxFQUFFLENBQUM7UUFDZkMsT0FBTyxDQUFDQyxHQUFHLENBQUNGLEtBQUs7UUFDakIsTUFBTSxDQUFDLENBQUM7WUFBQ0csR0FBRyxFQUFFLENBQXNCO1FBQUMsQ0FBQztJQUN4QyxDQUFDO0FBQ0gsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2NsaWVudC8uL2hvb2tzL2ZldGNoUGF5bWVudC5qcz9hYmM1Il0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBmZXRjaFBheW1lbnQgPSBhc3luYyAob3JkZXIsIGN1cnJlbnRVc2VyKSA9PiB7XHJcbiAgdmFyIG15SGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XHJcbiAgbXlIZWFkZXJzLmFwcGVuZChcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XHJcbiAgbXlIZWFkZXJzLmFwcGVuZChcIngtY2xpZW50LWlkXCIsIHByb2Nlc3MuZW52LkNBU0hGUkVFX0FQUElEKTtcclxuICBteUhlYWRlcnMuYXBwZW5kKFwieC1jbGllbnQtc2VjcmV0XCIsIHByb2Nlc3MuZW52LkNBU0hGUkVFX1NFQ1JFVF9LRVkpO1xyXG4gIG15SGVhZGVycy5hcHBlbmQoXCJ4LWFwaS12ZXJzaW9uXCIsIFwiMjAyMi0wMS0wMVwiKTtcclxuXHJcbiAgdmFyIHJhdyA9IEpTT04uc3RyaW5naWZ5KHtcclxuICAgIG9yZGVyX2Ftb3VudDogb3JkZXIudGlja2V0LnByaWNlLFxyXG4gICAgb3JkZXJfY3VycmVuY3k6IFwiSU5SXCIsXHJcbiAgICBjdXN0b21lcl9kZXRhaWxzOiB7XHJcbiAgICAgIGN1c3RvbWVyX2lkOiBvcmRlci51c2VySWQsXHJcbiAgICAgIGN1c3RvbWVyX2VtYWlsOiBjdXJyZW50VXNlci5lbWFpbCxcclxuICAgICAgY3VzdG9tZXJfcGhvbmU6IFwiOTkwODczNDgwMVwiLFxyXG4gICAgfSxcclxuICAgIG9yZGVyX21ldGE6IHtcclxuICAgICAgcmV0dXJuX3VybDpcclxuICAgICAgICBcImh0dHBzOi8vdGlja2V0aW5nLmRldj9vcmRlcl9pZD17b3JkZXJfaWR9Jm9yZGVyX3Rva2VuPXtvcmRlcl90b2tlbn1cIixcclxuICAgIH0sXHJcbiAgICBvcmRlcl9leHBpcnlfdGltZTogb3JkZXIuZXhwaXJlc0F0LFxyXG4gIH0pO1xyXG5cclxuICB2YXIgcmVxdWVzdE9wdGlvbnMgPSB7XHJcbiAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgaGVhZGVyczogbXlIZWFkZXJzLFxyXG4gICAgYm9keTogcmF3LFxyXG4gICAgcmVkaXJlY3Q6IFwiZm9sbG93XCIsXHJcbiAgfTtcclxuICB0cnkge1xyXG4gICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goXCIvYXBpL3BheVwiLCByZXF1ZXN0T3B0aW9ucyk7XHJcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzLmpzb24oKTtcclxuICAgIHJldHVybiB7IGRhdGEgfTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgcmV0dXJuIHsgZXJyOiBcInNvbWV0aGluZyB3ZW50IHdyb25nXCIgfTtcclxuICB9XHJcbn07XHJcbiJdLCJuYW1lcyI6WyJmZXRjaFBheW1lbnQiLCJvcmRlciIsImN1cnJlbnRVc2VyIiwibXlIZWFkZXJzIiwiSGVhZGVycyIsImFwcGVuZCIsInByb2Nlc3MiLCJlbnYiLCJDQVNIRlJFRV9BUFBJRCIsIkNBU0hGUkVFX1NFQ1JFVF9LRVkiLCJyYXciLCJKU09OIiwic3RyaW5naWZ5Iiwib3JkZXJfYW1vdW50IiwidGlja2V0IiwicHJpY2UiLCJvcmRlcl9jdXJyZW5jeSIsImN1c3RvbWVyX2RldGFpbHMiLCJjdXN0b21lcl9pZCIsInVzZXJJZCIsImN1c3RvbWVyX2VtYWlsIiwiZW1haWwiLCJjdXN0b21lcl9waG9uZSIsIm9yZGVyX21ldGEiLCJyZXR1cm5fdXJsIiwib3JkZXJfZXhwaXJ5X3RpbWUiLCJleHBpcmVzQXQiLCJyZXF1ZXN0T3B0aW9ucyIsIm1ldGhvZCIsImhlYWRlcnMiLCJib2R5IiwicmVkaXJlY3QiLCJyZXMiLCJmZXRjaCIsImRhdGEiLCJqc29uIiwiZXJyb3IiLCJjb25zb2xlIiwibG9nIiwiZXJyIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./hooks/fetchPayment.js\n");

/***/ }),

/***/ "./pages/orders/[orderId].js":
/*!***********************************!*\
  !*** ./pages/orders/[orderId].js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _hooks_fetchPayment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../hooks/fetchPayment */ \"./hooks/fetchPayment.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nconst OrderShow = ({ order , currentUser  })=>{\n    const { 0: timeLeft , 1: setTileLeft  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(0);\n    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{\n        const getTimeLeft = ()=>{\n            let remainingTime = new Date(order.expiresAt) - new Date();\n            setTileLeft(Math.floor(remainingTime / 1000));\n        };\n        getTimeLeft();\n        const timer = setInterval(()=>{\n            if (timeLeft < 0) {\n                clearInterval(timer);\n            }\n            getTimeLeft();\n        }, 1000);\n        return ()=>clearInterval(timer)\n        ;\n    }, [\n        order\n    ]);\n    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(async ()=>{\n        const pay = await (0,_hooks_fetchPayment__WEBPACK_IMPORTED_MODULE_1__.fetchPayment)(order, currentUser);\n        console.log(pay);\n    }, []);\n    return(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        children: timeLeft < 0 ? \"Order expired\" : `Remaining time to expire the order: ${timeLeft} second`\n    }, void 0, false, {\n        fileName: \"D:\\\\Coding\\\\ticketing\\\\client\\\\pages\\\\orders\\\\[orderId].js\",\n        lineNumber: 26,\n        columnNumber: 5\n    }, undefined));\n};\nOrderShow.getInitialProps = async (context, client, currentUser)=>{\n    const { orderId  } = context.query;\n    const { data: { order  } ,  } = await client.get(`/api/orders/${orderId}`);\n    // const { order_id, payment_link, order_token } = await res.data;\n    return {\n        order\n    };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (OrderShow);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9vcmRlcnMvW29yZGVySWRdLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBdUQ7QUFDWjtBQUMzQyxLQUFLLENBQUNHLFNBQVMsSUFBSSxDQUFDLENBQUNDLEtBQUssR0FBRUMsV0FBVyxFQUFDLENBQUMsR0FBSyxDQUFDO0lBQzdDLEtBQUssTUFBRUMsUUFBUSxNQUFFQyxXQUFXLE1BQUlOLCtDQUFRLENBQUMsQ0FBQztJQUMxQ0MsZ0RBQVMsS0FBTyxDQUFDO1FBQ2YsS0FBSyxDQUFDTSxXQUFXLE9BQVMsQ0FBQztZQUN6QixHQUFHLENBQUNDLGFBQWEsR0FBRyxHQUFHLENBQUNDLElBQUksQ0FBQ04sS0FBSyxDQUFDTyxTQUFTLElBQUksR0FBRyxDQUFDRCxJQUFJO1lBQ3hESCxXQUFXLENBQUNLLElBQUksQ0FBQ0MsS0FBSyxDQUFDSixhQUFhLEdBQUcsSUFBSTtRQUM3QyxDQUFDO1FBQ0RELFdBQVc7UUFFWCxLQUFLLENBQUNNLEtBQUssR0FBR0MsV0FBVyxLQUFPLENBQUM7WUFDL0IsRUFBRSxFQUFFVCxRQUFRLEdBQUcsQ0FBQyxFQUFFLENBQUM7Z0JBQ2pCVSxhQUFhLENBQUNGLEtBQUs7WUFDckIsQ0FBQztZQUNETixXQUFXO1FBQ2IsQ0FBQyxFQUFFLElBQUk7UUFDUCxNQUFNLEtBQU9RLGFBQWEsQ0FBQ0YsS0FBSzs7SUFDbEMsQ0FBQyxFQUFFLENBQUNWO1FBQUFBLEtBQUs7SUFBQSxDQUFDO0lBQ1ZGLGdEQUFTLFdBQWEsQ0FBQztRQUNyQixLQUFLLENBQUNlLEdBQUcsR0FBRyxLQUFLLENBQUNqQixpRUFBWSxDQUFDSSxLQUFLLEVBQUVDLFdBQVc7UUFDakRhLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDRixHQUFHO0lBQ2pCLENBQUMsRUFBRSxDQUFDLENBQUM7SUFFTCxNQUFNLDZFQUNIRyxDQUFHO2tCQUNEZCxRQUFRLEdBQUcsQ0FBQyxHQUNULENBQWUsa0JBQ2Qsb0NBQW9DLEVBQUVBLFFBQVEsQ0FBQyxPQUFPOzs7Ozs7QUFHakUsQ0FBQztBQUVESCxTQUFTLENBQUNrQixlQUFlLFVBQVVDLE9BQU8sRUFBRUMsTUFBTSxFQUFFbEIsV0FBVyxHQUFLLENBQUM7SUFDbkUsS0FBSyxDQUFDLENBQUMsQ0FBQ21CLE9BQU8sRUFBQyxDQUFDLEdBQUdGLE9BQU8sQ0FBQ0csS0FBSztJQUNqQyxLQUFLLENBQUMsQ0FBQyxDQUNMQyxJQUFJLEVBQUUsQ0FBQyxDQUFDdEIsS0FBSyxFQUFDLENBQUMsSUFDakIsQ0FBQyxHQUFHLEtBQUssQ0FBQ21CLE1BQU0sQ0FBQ0ksR0FBRyxFQUFFLFlBQVksRUFBRUgsT0FBTztJQUUzQyxFQUFrRTtJQUNsRSxNQUFNLENBQUMsQ0FBQztRQUFDcEIsS0FBSztJQUFDLENBQUM7QUFDbEIsQ0FBQztBQUVELGlFQUFlRCxTQUFTLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jbGllbnQvLi9wYWdlcy9vcmRlcnMvW29yZGVySWRdLmpzP2RiY2UiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZmV0Y2hQYXltZW50IH0gZnJvbSBcIi4uLy4uL2hvb2tzL2ZldGNoUGF5bWVudFwiO1xyXG5pbXBvcnQgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSBcInJlYWN0XCI7XHJcbmNvbnN0IE9yZGVyU2hvdyA9ICh7IG9yZGVyLCBjdXJyZW50VXNlciB9KSA9PiB7XHJcbiAgY29uc3QgW3RpbWVMZWZ0LCBzZXRUaWxlTGVmdF0gPSB1c2VTdGF0ZSgwKTtcclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3QgZ2V0VGltZUxlZnQgPSAoKSA9PiB7XHJcbiAgICAgIGxldCByZW1haW5pbmdUaW1lID0gbmV3IERhdGUob3JkZXIuZXhwaXJlc0F0KSAtIG5ldyBEYXRlKCk7XHJcbiAgICAgIHNldFRpbGVMZWZ0KE1hdGguZmxvb3IocmVtYWluaW5nVGltZSAvIDEwMDApKTtcclxuICAgIH07XHJcbiAgICBnZXRUaW1lTGVmdCgpO1xyXG5cclxuICAgIGNvbnN0IHRpbWVyID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICBpZiAodGltZUxlZnQgPCAwKSB7XHJcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lcik7XHJcbiAgICAgIH1cclxuICAgICAgZ2V0VGltZUxlZnQoKTtcclxuICAgIH0sIDEwMDApO1xyXG4gICAgcmV0dXJuICgpID0+IGNsZWFySW50ZXJ2YWwodGltZXIpO1xyXG4gIH0sIFtvcmRlcl0pO1xyXG4gIHVzZUVmZmVjdChhc3luYyAoKSA9PiB7XHJcbiAgICBjb25zdCBwYXkgPSBhd2FpdCBmZXRjaFBheW1lbnQob3JkZXIsIGN1cnJlbnRVc2VyKTtcclxuICAgIGNvbnNvbGUubG9nKHBheSk7XHJcbiAgfSwgW10pO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdj5cclxuICAgICAge3RpbWVMZWZ0IDwgMFxyXG4gICAgICAgID8gXCJPcmRlciBleHBpcmVkXCJcclxuICAgICAgICA6IGBSZW1haW5pbmcgdGltZSB0byBleHBpcmUgdGhlIG9yZGVyOiAke3RpbWVMZWZ0fSBzZWNvbmRgfVxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufTtcclxuXHJcbk9yZGVyU2hvdy5nZXRJbml0aWFsUHJvcHMgPSBhc3luYyAoY29udGV4dCwgY2xpZW50LCBjdXJyZW50VXNlcikgPT4ge1xyXG4gIGNvbnN0IHsgb3JkZXJJZCB9ID0gY29udGV4dC5xdWVyeTtcclxuICBjb25zdCB7XHJcbiAgICBkYXRhOiB7IG9yZGVyIH0sXHJcbiAgfSA9IGF3YWl0IGNsaWVudC5nZXQoYC9hcGkvb3JkZXJzLyR7b3JkZXJJZH1gKTtcclxuXHJcbiAgLy8gY29uc3QgeyBvcmRlcl9pZCwgcGF5bWVudF9saW5rLCBvcmRlcl90b2tlbiB9ID0gYXdhaXQgcmVzLmRhdGE7XHJcbiAgcmV0dXJuIHsgb3JkZXIgfTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IE9yZGVyU2hvdztcclxuIl0sIm5hbWVzIjpbImZldGNoUGF5bWVudCIsInVzZVN0YXRlIiwidXNlRWZmZWN0IiwiT3JkZXJTaG93Iiwib3JkZXIiLCJjdXJyZW50VXNlciIsInRpbWVMZWZ0Iiwic2V0VGlsZUxlZnQiLCJnZXRUaW1lTGVmdCIsInJlbWFpbmluZ1RpbWUiLCJEYXRlIiwiZXhwaXJlc0F0IiwiTWF0aCIsImZsb29yIiwidGltZXIiLCJzZXRJbnRlcnZhbCIsImNsZWFySW50ZXJ2YWwiLCJwYXkiLCJjb25zb2xlIiwibG9nIiwiZGl2IiwiZ2V0SW5pdGlhbFByb3BzIiwiY29udGV4dCIsImNsaWVudCIsIm9yZGVySWQiLCJxdWVyeSIsImRhdGEiLCJnZXQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/orders/[orderId].js\n");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("react/jsx-dev-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/orders/[orderId].js"));
module.exports = __webpack_exports__;

})();